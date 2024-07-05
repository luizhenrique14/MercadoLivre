import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/model/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ICart, ICartRequest } from 'src/model/cart';

@Injectable({
  providedIn: 'root',
})
export class CartProductServie {
  private getProductpath = 'http://localhost:5000/api/products'; // URL do seu backend API
  private addProductpath = 'http://localhost:5000/api/products/add'; // URL do seu backend API

  private cartPath = 'http://localhost:5000/api/cart';
  private addCartPath = 'http://localhost:5000/api/cart/add';

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<IProduct[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Exemplo de header opcional
      Authorization: 'Bearer my-auth-token', // Exemplo de header opcional
    });
    return this.http.get<IProduct[]>(this.getProductpath, { headers }).pipe(
      catchError((error) => {
        console.error('Erro ao obter produtos:', error);
        throw error;
      })
    );
  }

  addProduct(product: IProduct): Observable<IProduct> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Exemplo de header opcional
      Authorization: 'Bearer my-auth-token', // Exemplo de header opcional
    });
    return this.http
      .post<IProduct>(this.addProductpath, product, { headers })
      .pipe(
        catchError((error) => {
          console.error('Erro ao adicionar produto:', error);
          throw error;
        })
      );
  }

  getCart(): Observable<ICart[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Exemplo de header opcional
      Authorization: 'Bearer my-auth-token', // Exemplo de header opcional
    });
    return this.http.get<ICart[]>(this.cartPath, { headers }).pipe(
      catchError((error) => {
        console.error('Erro ao obter produtos:', error);
        throw error;
      })
    );
  }

  addProductToCart(product: ICartRequest): Observable<IProduct> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Exemplo de header opcional
      Authorization: 'Bearer my-auth-token', // Exemplo de header opcional
    });
    return this.http
      .post<IProduct>(this.addCartPath, product, { headers })
      .pipe(
        catchError((error) => {
          console.error('Erro ao adicionar produto ao carrinho', error);
          throw error;
        })
      );
  }

  removeItem(idItem: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Exemplo de header opcional
      Authorization: 'Bearer my-auth-token', // Exemplo de header opcional
    });
    return this.http
      .delete<ICart[]>(this.cartPath + '/' + idItem, { headers })
      .pipe(
        catchError((error) => {
          console.error('Erro ao obter produtos:', error);
          throw error;
        })
      );
  }
}
