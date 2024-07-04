import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/model/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CartProductServie {
    private apiUrl = 'http://localhost:5000/api/products'; // URL do seu backend API

    constructor(private http: HttpClient) {}   

    getProdutos(): Observable<IProduct[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json', // Exemplo de header opcional
            'Authorization': 'Bearer my-auth-token' // Exemplo de header opcional
          });
          return this.http.get<IProduct[]>(this.apiUrl, { headers })
          .pipe(
            catchError(error => {
              console.error('Erro ao obter produtos:', error);
              throw error;
            })
          );
    }
}
