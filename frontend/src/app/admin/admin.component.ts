import { Component } from '@angular/core';
import { PoiService } from '../services/poi.service';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../map/map.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, MapComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private poiService: PoiService) {}

  pendingPOIs: any[] = [];
  showPendingPOIs: boolean = false;
  confirmationMessage: string | null = null;
  moreInfoPOI: any = null;
  mostrarFechaEvento: boolean = false;

  loadPendingPOIs() {
    console.log('Cargando POIs pendientes...');
    this.poiService.getPendingPOIs().subscribe({
      next: (pois) => {
        console.log('Datos recibidos:', pois);
        this.pendingPOIs = pois.map( poi => ({...poi, showInfo: false}));
        this.showPendingPOIs = true;
      },
      error: (err) => {
        console.error('Error al cargar POIs pendientes:', err);
      }
    });
  }

  approvePOI(nombre: string) {
    this.poiService.approvePOI(nombre).subscribe({
      next: (response) => {
        console.log('POI aprobado:', response);
        this.showConfirmation(`POI "${nombre}" aprobado`);
        this.removePOI(nombre);
      },
      error: (err) => {
        console.error('Error al aprobar POI:', err);
      }
    });
  }

  rejectPOI(nombre: string) {
    this.poiService.rejectPOI(nombre).subscribe({
      next: (response) => {
        console.log('POI rechazado:', response);
        this.showConfirmation(`POI "${nombre}" rechazado`);
        this.removePOI(nombre);
      },
      error: (err) => {
        console.error('Error al rechazar POI:', err);
      }
    });
  }

  toggleInfo(poi: any) {
    poi.showInfo = !poi.showInfo;
  }

  showConfirmation(message: string) {
    this.confirmationMessage = message;
    setTimeout(() => (this.confirmationMessage = null), 5000); // Desaparece en 3 segundos
  }

  removePOI(nombre: string) {
    this.pendingPOIs = this.pendingPOIs.filter((poi) => poi !== nombre);
  }
}

