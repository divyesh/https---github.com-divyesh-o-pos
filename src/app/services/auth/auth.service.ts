import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../../interfaces/models';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private httpClient: HttpClient) { }
  login(data: any) {    
    return this.httpClient.post<AuthResponse>(`${environment.apiUrl}/Auth/login`, data)
      .pipe(tap((result) => {
        localStorage.setItem('authUser', JSON.stringify(result));
      }));
  }
  logout() {
    localStorage.removeItem('authUser');
  }
  isLoggedIn() {
    return localStorage.getItem('authUser') !== null;
  }
}
