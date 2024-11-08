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
  
  validatePin(): void {
    if (this.authService.authenticate(this.email, this.pin)) {
      this.errorMessage = null;
      this.router.navigate(['/admin']);
      
    } else {
      this.errorMessage = 'PIN inválido. Inténtalo de nuevo.';
    }
  }

  navigateToRegisterForm() {
    this.router.navigate(['/registro']); //FALTA EL COMPONENTE 
  }
}

