import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl: string = '';

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getUserInLocalStorage() {
    return localStorage.getItem('user');
  }

  getUser(email: string, password: string) {
    const body: any = { email, password };
    return this.httpClient.post<any>(`${this.apiUrl}/Users/GetByMailAndPassword`, body);
  }

  sendPassword(email: string) {
    const body: any = { email };
    return this.httpClient.post<boolean>(`${this.apiUrl}/Users/SendPassword`, body);
  }

  verifyEmailExists(email: string): Promise<boolean> {
    const body: any = { email };
    return this.httpClient.post<boolean>(`${this.apiUrl}/Users/VerifyEmailExists`, body).toPromise();
  }

  insertNewUser(body: any): Promise<boolean>{
    return this.httpClient.post<boolean>(`${this.apiUrl}/Users/InsertUser`, body).toPromise();
  }
}
