import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isAuthenticated = false;

  constructor() {}

  authenticate(pin: string): boolean {
    if (pin === '1234') { 
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  isAdminAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  logout() {
    this.isAuthenticated = false;
  }
}
