import { Component } from '@angular/core';
import { PoiService } from '../services/poi.service'; 
import { CommonModule } from '@angular/common'; 
import { MapComponent } from '../map/map.component';

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

  loadPendingPOIs() {
    console.log('Cargando POIs pendientes...');
    this.poiService.getPendingPOIs().subscribe({
      next: (pois) => {
        console.log('Datos recibidos:', pois); 
        this.pendingPOIs = pois; 
        this.showPendingPOIs = true; 
      },
      error: (err) => {
        console.error('Error al cargar POIs pendientes:', err);
      }
    });
  }

  //aprobar poi
  approvePOI(nombre: string) {
    this.poiService.approvePOI(nombre).subscribe({
      next: (response) => {
        console.log('POI aprobado:', response);
      },
      error: (err) => {
        console.error('Error al aprobar POI:', err);
      }
    });
  }

  // Método para rechazar un POI
  rejectPOI(nombre: string) {
    this.poiService.rejectPOI(nombre).subscribe({
      next: (response) => {
        console.log('POI rechazado:', response);
      },
      error: (err) => {
        console.error('Error al rechazar POI:', err);
      }
    });
  }
}
