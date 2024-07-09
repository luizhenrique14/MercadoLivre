import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ICart } from 'src/model/cart';
import { IProduct } from 'src/model/product';
import { CartProductServie } from 'src/service/cart-products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
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
  newProduct: FormGroup;
  produtos: IProduct[] = [];
  cart: ICart[] = [];
  amount?: number;
  quantidadeTotal: number = 0;
  openAlert: boolean = false;

  newProductItem: IProduct = {
    id: 0,
    name: '',
    price: 0.0,
    updatedAt: '',
    createdAt: '',
  };

  ngOnInit(): void {
    this.getCart();
  }

  returnToHome() {
    this.router.navigate(['/home']);
  }

  getCart(): void {
    this.productService.getCart().subscribe(
      (cart) => {
        this.cart = cart;
        this.calculateTotalValue(this.cart);
        this.calculateQuantity(this.cart);
      },
      (error) => console.error('Erro ao carregar produtos', error)
    );
  }

  calculateQuantity(cart: ICart[]) {
    this.quantidadeTotal = cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  calculateTotalValue(cart: ICart[]) {
    this.amount = cart.reduce((total, item) => total + item.subtotal, 0);
  }

  // Validador personalizado para aceitar apenas números separados por vírgula
  priceValidator(control: FormControl): { [key: string]: any } | null {
    const valid = /^\d+(,\d+)?$/.test(control.value);
    return valid
      ? null
      : { invalidPrice: { valid: false, value: control.value } };
  }

  removeCart(cart: ICart) {
    this.productService.removeItem(cart.id.toString()).subscribe(
      (cart) => {
        this.ngOnInit();
      },
      (error) => console.error('Erro ao carregar produtos', error)
    );
  }

  updateQuantity(product: IProduct): void {
    const cartItem = this.cart.find((item) => item.ProductId === product.id);
    if (cartItem) {
      cartItem.subtotal = product.price * cartItem.quantity;
      this.calculateTotalValue(this.cart);
      this.productService.updateProductQuantity(cartItem.id, cartItem.quantity)
        .subscribe(
          (cart) => {
            this.openAlert = true;
            setTimeout(() => {
              this.openAlert = false;
            }, 5000);
          },
          (error) => console.error('Erro ao carregar produtos', error)
        );
      this.calculateQuantity(this.cart);
    }
  }

  goToFrete() {
    this.router.navigate(['/freifht']);
  }
}
