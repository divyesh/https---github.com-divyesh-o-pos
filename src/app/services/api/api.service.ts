import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ProductCategory } from '../../interfaces/models';
import { delay, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
environment

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getAllCategories$(){
    const headers = { "Authorization": 'Bearer ' + this.getToken()};
    const url=`${environment.apiUrl}/ProductCategory`;
    return this.http.get<ProductCategory[]>(url,{headers});
  }

  public getProducts(categoryId: number) {
    const headers = { "Authorization": 'Bearer ' + this.getToken()};
    return this.http.get<Product[]>(environment.apiUrl + '/Product/' + categoryId, {headers});
  }
  getToken(): any {
    const localStore = localStorage.getItem('authUser') as string;
    let authObj = JSON.parse(localStore);
    const headers = { 'Authorization': 'Bearer ' + authObj['token'] }
    return authObj['token'];
  }
}
