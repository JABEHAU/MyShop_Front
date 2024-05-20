import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ShoppingCart } from '../models/shopping-cart.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private apiUrl: string = '';

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  insertItem(productoId: number, usuarioId: number) {
    const body = { productoId, usuarioId };
    return this.httpClient.post<boolean>(`${this.apiUrl}/ShoppingCart/InsertItem`, body);
  }

  verifyItemExistsAsync(productoId: number, usuarioId: number) {
    const body = { productoId, usuarioId };
    return this.httpClient.post<boolean>(`${this.apiUrl}/ShoppingCart/VerifyExists`, body);
  }

  getShoppingCartByUser(usuarioId: number) {
    const body = { usuarioId };
    return this.httpClient.post<ShoppingCart[]>(`${this.apiUrl}/ShoppingCart/GetByUser`, body);
  }

  deleteItem(itemId: number){
    const body = {itemId};
    return this.httpClient.post<boolean>(`${this.apiUrl}/ShoppingCart/DeleteItem`, body);
  }
}
