import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer my-auth-token', // Exemplo de header opcional
  });

  constructor(private http: HttpClient) {}

  register(username: string, password: string): Observable<any> {
    console.log('password', password)
    const body = {
      username: username,
      password: password,
    };
    return this.http.post<any>(`${this.apiUrl}/register`, body, {
      headers: this.headers,
    });
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      username: username,
      password: password,
    };

    return this.http
      .post<any>('http://localhost:5000/api/login', body, {
        headers: this.headers,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem('jwtToken', response.token);
        }),
        catchError((error) => {
          console.error('Erro ao tentar fazer login:', error);
          throw error;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('jwtToken');
    return !!token; // Retorna true se o token existir, false caso contrário
  }
}
