import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  protected baseUrl = 'http://localhost:3000/admin';
  private isAuthenticated = false;

  constructor(private http: HttpClient) {}

  authenticate(email:string, pin: string): boolean {

    this.http.get(`${this.baseUrl}/register`, {}).subscribe(
      (response: any) => {

        if(pin === response.pin && email === response.email){
          this.isAuthenticated = true;
        }
      })
      return this.isAuthenticated;
  }

  registrar(email:string, pin: string){
    const admin = {
      email: email,
      pin: pin
    }
    this.http.post(`${this.baseUrl}/register`, admin)
  }

  isAdminAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  logout() {
    this.isAuthenticated = false;
  }
}
