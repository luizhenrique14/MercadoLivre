import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ICart } from 'src/model/cart';
import { IFreight } from 'src/model/freight';
import { CartProductServie } from 'src/service/cart-products.service';

@Component({
  selector: 'app-freight',
  templateUrl: './freight.component.html',
  styleUrls: ['./freight.component.css'],
})
export class FreightComponent implements OnInit {
  constructor(
    private productService: CartProductServie,
    private router: Router
  ) {}

  valorFrete: string = '0';

  openAlertFinish: boolean = false;

  quantidadeTotal: number = 0;
  amount: string = '0.00';

  cart: ICart[] = [];
  freight: IFreight = {
    endValue: '0',
    freightValue: '0',
    totalValue: '0',
  };

  ngOnInit(): void {
    this.getCart();
  }

  returnToHome() {
    this.router.navigate(['/home']);
  }

  finalizarCompra() {
    this.openAlertFinish = true;
    setTimeout(() => {
      this.openAlertFinish = false;
    }, 5000);
  }

  getCart(): void {
    this.productService.getCart().subscribe(
      (cart) => {
        this.cart = cart;
        this.calculaValorTotal(this.cart);
        this.calculaQuantiadade(this.cart);
      },
      (error) => console.error('Erro ao carregar produtos', error)
    );
  }

  calculaValorTotal(cart: ICart[]) {
    return this.amount = cart.reduce((total, item) => total + item.subtotal, 0).toFixed(2).toString();
  }
  

  priceValidator(control: FormControl): { [key: string]: any } | null {
    const valid = /^\d+(,\d+)?$/.test(control.value);
    return valid
      ? null
      : { invalidPrice: { valid: false, value: control.value } };
  }

  calculaQuantiadade(cart: ICart[]) {
    this.quantidadeTotal = cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  calculaFrete(frete: string) {
    this.productService.getFreigth(frete, this.calculaValorTotal(this.cart)).subscribe(
      (freight: IFreight) => {
        this.freight = freight;
        this.amount = this.freight.endValue
      },
      (error) => console.error('Erro ao carregar produtos', error)
    );
  }

}
