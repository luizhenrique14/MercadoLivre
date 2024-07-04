import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/model/product';
import { CartProductServie } from 'src/service/cart-products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private productService: CartProductServie) {}

  produtos: IProduct[] = [];

  ngOnInit(): void {
    this.getProdutos();
  }

  getProdutos(): void {
    this.productService.getProdutos()
      .subscribe(
        produtos => {
          this.produtos = produtos;
        },
        error => console.error('Erro ao carregar produtos', error)
      );
  }
}
