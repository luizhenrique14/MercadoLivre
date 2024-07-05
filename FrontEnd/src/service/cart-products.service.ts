import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IProduct } from 'src/model/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ICart, ICartRequest } from 'src/model/cart';

@Injectable({
  providedIn: 'root',
})
export class CartProductServie {
  private readonly apiUrl = 'http://localhost:5000/api';
  
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer my-auth-token', // Exemplo de header opcional
  });

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.apiUrl}/products`, { headers: this.headers }).pipe(
      catchError(this.handleError('Erro ao obter produtos'))
    );
  }

  addProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.apiUrl}/products/add`, product, { headers: this.headers }).pipe(
      catchError(this.handleError('Erro ao adicionar produto'))
    );
  }

  getCart(): Observable<ICart[]> {
    return this.http.get<ICart[]>(`${this.apiUrl}/cart`, { headers: this.headers }).pipe(
      catchError(this.handleError('Erro ao obter produtos do carrinho'))
    );
  }

  addProductToCart(product: ICartRequest): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.apiUrl}/cart/add`, product, { headers: this.headers }).pipe(
      catchError(this.handleError('Erro ao adicionar produto ao carrinho'))
    );
  }

  removeItem(idItem: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cart/${idItem}`, { headers: this.headers }).pipe(
      catchError(this.handleError('Erro ao remover produto do carrinho'))
    );
  }

  updateProductQuantity(cartItem: ICart): Observable<ICart> {
    return this.http.put<ICart>(`${this.apiUrl}/cart/${cartItem.id}`, cartItem, { headers: this.headers }).pipe(
      catchError(this.handleError('Erro ao atualizar quantidade do produto no carrinho'))
    );
  }

  private handleError(message: string) {
    return (error: any): Observable<never> => {
      console.error(message, error);
      return throwError(() => new Error(message));
    };
  }
}
