import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
import { AuthService } from '../services/authenticate.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-pin',
  standalone: true,
  templateUrl: './admin-pin.component.html',
  styleUrls: ['./admin-pin.component.css'],
  imports: [CommonModule, FormsModule],
})

export class AdminPinComponent {
  pin: string = '';
  email: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}
  
  async validateAdmin(): Promise<void> {
    const isAuthenticated = await this.authService.authenticate(this.email, this.pin);
    const adminExist = this.authService.DoesAdminExist();
   
    if (isAuthenticated) {
      this.errorMessage = null;
      this.router.navigate(['/admin']);
    } else {
      if (!adminExist){
        this.errorMessage = 'Debes registrarte para poder ingresar. '
      } else{
        this.errorMessage = 'PIN o email inválido. Inténtalo de nuevo.';
      }
    }
  }
  

  navigateToRegisterForm() {
    this.router.navigate(['/registro']); 
  }
}

