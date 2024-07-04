import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartProductsService {

  constructor() { }

  getProducts() {
    return this.$http.get(apiUrl)
      .then(response => {
        return response.data.map(productData => new Product(productData.id, productData.name, productData.price));
      });
  }
 
  addProduct(product:any) {
    return this.$http.post(apiUrl, product);
  }

  // updateProduct(productId: string, product) {
  //   return this.$http.put(apiUrl + '/' + productId, product);
  // }

  deleteProduct(productId: string) {
    return this.$http.delete(apiUrl + '/' + productId);
  }
}
