import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  protected baseUrl = `${environment.apiUrl}/points-of-interest`;;
  private isAuthenticated = false;
  private adminExiste = true;

  constructor(private http: HttpClient) {}

  async authenticate(email: string, pin: string): Promise<boolean> {
    try {
      const response: any = await this.http.get(`${this.baseUrl}/datos-admin`, {}).toPromise();
      if (pin === response.pin && email === response.email) {
        this.isAuthenticated = true;
        return true;
      } else {
        this.isAuthenticated = false;
        return false;
      }
    } catch (error) {
        if (error instanceof HttpErrorResponse && error.status === 404) {
          this.adminExiste = false;
        } else {
          this.adminExiste = true;
        }
        return false;
    }
  }
  

  registrar(email:string, pin: string){
    const admin = {
      email: email,
      pin: pin
    }
    return this.http.post(`${this.baseUrl}/register`, admin)
  }

  isAdminAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  DoesAdminExist(): boolean {
    return this.adminExiste;
  }

  logout() {
    this.isAuthenticated = false;
  }
}
