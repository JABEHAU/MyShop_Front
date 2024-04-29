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

  getUser(email: string, password: string){
    const body: any = {email, password};
    return this.httpClient.post<any>(`${this.apiUrl}/Users/GetByMailAndPassword`, body);
  }
}
