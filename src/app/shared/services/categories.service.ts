import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CategoryWithProducts } from '../models/category-with-products.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrl: string = '';

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
   }

  getCategories(){
    return this.httpClient.post<any>(`${this.apiUrl}/Categories/GetAll`, null);
  }

  getTopCategoriesInOffer(){
    return this.httpClient.post<any>(`${this.apiUrl}/Categories/TopInOffer`, null);
  }

  getCategoriesWithProducts(){
    return this.httpClient.post<CategoryWithProducts[]>(`${this.apiUrl}/Categories/GetWithTopProducts`, null);
  }
}
