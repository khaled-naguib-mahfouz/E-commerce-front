import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Product } from '../../models/product';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:31130/api/Products';


  constructor(private http: HttpClient) { }
  getAllProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getProductsByCategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/category/${categoryId}`);
  }
  getProductById(productId: number) {
    return this.http.get<Product>(`${this.apiUrl}/${productId}`);
  }
}
