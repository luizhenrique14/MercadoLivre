import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    private fb: FormBuilder
  ) {
    this.newProduct = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required, this.priceValidator]],
    });
  }
  newProduct: FormGroup;
  produtos: IProduct[] = [];

  newProductItem: IProduct = {
    id: 0,
    name: "",
    price: 0.0,
    updatedAt: "",
    createdAt: ""
}

  ngOnInit(): void {
    this.getProdutos();
  }


  addNewProduct() {
    const name = this.newProduct.get('name')?.value;
    const price = this.newProduct.get('price')?.value;

    this.newProductItem.name = name;
    this.newProductItem.price = price;

    if (this.newProduct.valid) {
      this.productService.addProduct(this.newProductItem).subscribe(
        (produtos) => {
          this.ngOnInit();
          console.log('produtos', produtos)
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

    // Validador personalizado para aceitar apenas números separados por vírgula
    priceValidator(control: FormControl): { [key: string]: any } | null {
      const valid = /^\d+(,\d+)?$/.test(control.value);
      return valid ? null : { invalidPrice: { valid: false, value: control.value } };
    }
}
