import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})

export class AdminDashboardComponent {
  showPointsOfInterest = false;
  pendingPoints = [
    { name: 'Punto de interés 1' },
    { name: 'Punto de interés 2' },
    { name: 'Punto de interés 3' },
  ];

  togglePointsOfInterest() {
    this.showPointsOfInterest = !this.showPointsOfInterest;
  }

  acceptPoint(point: any) {
    console.log('Punto aceptado:', point);
    // Llamada al backend para aceptar el punto
  }

  rejectPoint(point: any) {
    console.log('Punto rechazado:', point);
    // Llamada al backend para rechazar el punto
  }
}
