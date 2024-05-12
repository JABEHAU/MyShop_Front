import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private userKey = 'user';
  private storageChange = new BehaviorSubject<boolean>(this.isUserLoggedIn());


  constructor() { 
    window.addEventListener('storage', this.handleStorageChange);
  }

  private handleStorageChange = (event: StorageEvent) => {
    if (event.key === this.userKey) {
      this.storageChange.next(this.isUserLoggedIn());
    }
  };

  isUserLoggedIn(): boolean {
    return localStorage.getItem(this.userKey) !== null;
  }

  getStorageChangeObservable() {
    return this.storageChange.asObservable();
  }

  getUser(): User| null{
    let userAsJson = localStorage.getItem('user');
    if(userAsJson)
      return JSON.parse(userAsJson) as User;

    return null
  }

  setUser(userValue: any) {
    localStorage.setItem(this.userKey, userValue);
    this.storageChange.next(true);
  }

  removeUser() {
    localStorage.removeItem(this.userKey);
    this.storageChange.next(false); 
  }
}
