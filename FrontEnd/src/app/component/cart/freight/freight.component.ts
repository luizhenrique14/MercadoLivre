import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ICart, ICartRequest } from 'src/model/cart';
import { IProduct } from 'src/model/product';
import { CartProductServie } from 'src/service/cart-products.service';

@Component({
  selector: 'app-freight',
  templateUrl: './freight.component.html',
  styleUrls: ['./freight.component.css'],
})
export class FreightComponent implements OnInit {
  constructor(
    private productService: CartProductServie,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.newProduct = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required, this.priceValidator]],
    });
  }

  valorFrete: string = '0';

  openAlertFinish: boolean = false;

  quantidadeTotal: number = 0;
  amount: number = 0;
  newProduct: FormGroup;

  cart: ICart[] = [];

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
    this.amount = cart.reduce((total, item) => total + item.subtotal, 0);
  }

  // Validador personalizado para aceitar apenas números separados por vírgula
  priceValidator(control: FormControl): { [key: string]: any } | null {
    const valid = /^\d+(,\d+)?$/.test(control.value);
    return valid
      ? null
      : { invalidPrice: { valid: false, value: control.value } };
  }

  calculaFrete(frete:string){

  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  calculaQuantiadade(cart: ICart[]) {
    this.quantidadeTotal = cart.reduce((sum, item) => sum + item.quantity, 0);
  }
}
