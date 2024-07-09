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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
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

  quantidadeTotal: number = 0;
  amount: number = 0;
  newProduct: FormGroup;
  produtos: IProduct[] = [];
  carrinho: ICart[] = [
    {
      createdAt: '',
      id: 0,
      Product: {
        createdAt: '',
        id: 0,
        name: '',
        price: 0,
        updatedAt: '',
      },
      ProductId: 0,
      quantity: 0,
      subtotal: 0,
      updatedAt: '',
    },
  ];

  newProductItem: IProduct = {
    id: 0,
    name: '',
    price: 0.0,
    updatedAt: '',
    createdAt: '',
  };

  ngOnInit(): void {
    this.getProdutos();
    this.getCart();
    this.calculaValorTotal();
  }

  calculaValorTotal() {
    this.productService.getCart().subscribe(
      (cart) => {
        this.amount = cart.reduce((total, item) => total + item.subtotal, 0);
      },
      (error) => console.error('Erro ao carregar produtos', error)
    );
  }

  addNewProduct() {
    const name = this.newProduct.get('name')?.value;
    const price = this.newProduct.get('price')?.value.replace(',', '.');

    this.newProductItem.name = name;
    this.newProductItem.price = price;

    if (this.newProduct.valid) {
      this.productService.addProduct(this.newProductItem).subscribe(
        (produtos) => {
          this.ngOnInit();
        },
        (error) => console.error('Erro ao carregar produtos', error)
      );
    }
  }

  getProdutos(): void {
    this.productService.getProdutos().subscribe(
      (produtos) => {
        this.produtos = produtos;
      },
      (error) => console.error('Erro ao carregar produtos', error)
    );
  }

  getCart(): void {
    this.productService.getCart().subscribe(
      (cart) => {
        this.calculaQuantiadade(cart);
      },
      (error) => console.error('Erro ao carregar produtos', error)
    );
  }

  // Validador personalizado para aceitar apenas números separados por vírgula
  priceValidator(control: FormControl): { [key: string]: any } | null {
    if (!control.value) {
      return null;
    }
    const transformedValue = control.value.replace(',', '.');
    const valid = /^\d+(\.\d+)?$/.test(transformedValue);

    return valid
      ? null
      : { invalidPrice: { valid: false, value: control.value } };
  }

  addCart(produto: IProduct) {
    const addCart: ICartRequest = {
      productId: produto.id.toString(),
      quantity: 1,
    };

    if (addCart) {
      this.productService.addProductToCart(addCart).subscribe(
        (cart) => {
          this.ngOnInit();
        },
        (error) => console.error('Erro ao carregar produtos', error)
      );
    }
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  calculaQuantiadade(cart: ICart[]) {
    this.quantidadeTotal = cart.reduce((sum, item) => sum + item.quantity, 0);
  }  
}
