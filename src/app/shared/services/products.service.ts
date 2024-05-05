import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl: string = '';

  constructor(private httpClient: HttpClient) { 
    this.apiUrl = environment.apiUrl;
  }

  getCategories(){
    return this.httpClient.post<any>(`${this.apiUrl}/Products/Categories`, null);
  }
}
