import { Component } from '@angular/core';
import { AuthService } from '../services/authenticate.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})

export class RegistroComponent {
  pin: string = '';
  email: string = '';
  re_pin: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router :Router) {}
  

  registrar(): void {
    this.authService.registrar(this.email, this.pin).subscribe(
      response => {
        console.log('Registro exitoso:', response);
        this.router.navigate(['/admin']); 
      },
      error => {
        console.error('Error en el registro:', error);
        this.errorMessage = 'Error en el registro. Inténtalo de nuevo.'; 
      }
    );
  }
  
  validate(): void {
    if (this.pin === this.re_pin) {
      this.registrar();
    } else {
      this.errorMessage = 'Los PINs no coinciden';
    }
  }
  

}
