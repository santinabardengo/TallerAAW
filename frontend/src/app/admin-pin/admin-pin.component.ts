import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para directivas como *ngIf
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-pin',
  standalone: true,
  templateUrl: './admin-pin.component.html',
  imports: [CommonModule],
})

export class AdminPinComponent {
  pin: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router) {}
  // Método que maneja el cambio de valor del input
  onPinChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Type assertion
    this.pin = inputElement.value;
  }

  validatePin(): void {
    if (this.pin === '1234') {
      console.log('PIN válido');
      this.errorMessage = null;
      this.router.navigate(['/admin']);
    } else {
      this.errorMessage = 'PIN inválido. Inténtalo de nuevo.';
      console.log('PIN inválido');
    }
  }
}
