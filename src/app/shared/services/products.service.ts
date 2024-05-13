import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BasicProduct } from '../models/basic-product.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl: string = '';

  constructor(private httpClient: HttpClient) { 
    this.apiUrl = environment.apiUrl;
  }

  getTopProductsByCategory(categoryId: number){
    const body = {categoryId};
    return this.httpClient.post<BasicProduct[]>(`${this.apiUrl}/Products/TopByCategory`, body);
  }

  getAllByCategory(categoryId: number){
    const body = {categoryId};
    return this.httpClient.post<BasicProduct[]>(`${this.apiUrl}/Products/GetAllByCategory`, body);
  }

  getProduct(productId: number){
    const body = {productId}
    return this.httpClient.post<Product>(`${this.apiUrl}/Products/GetProduct`, body);
  }
}
