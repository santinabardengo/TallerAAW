import { Component, ViewChild } from '@angular/core';
import { PoiRetrievalService } from '../services/poi-retrieval.service';
import { PoiModerationService } from '../services/poi-moderation.service';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../map/map.component';


interface PointOfInterest {
  nombre: string;
  ubicacion: string;
  descripcion: string;
  horarioApertura: string;
  horarioCierre: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, MapComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent {

  @ViewChild(MapComponent) mapComponent!: MapComponent;

  constructor(private poiRetrievalService: PoiRetrievalService, private poiModerationService: PoiModerationService ) {}

  pendingPOIs: PointOfInterest[] = [];
  approvedPOIs: PointOfInterest[] = [];
  showPendingPOIs: boolean = false;
  confirmationMessage: string | null = null;
  noHayPoisMensaje: string | null = null;
  moreInfoPOI: any = null;
  mostrarFechaEvento: boolean = false;

  

  loadPendingPOIs() {
    if (this.showPendingPOIs) {
      this.showPendingPOIs = false;
      this.pendingPOIs = []; 
      return; 
    }
    this.poiRetrievalService.getPendingPOIs().subscribe({
      next: (pois) => {
        this.pendingPOIs = pois;
        //this.pendingPOIs = pois.map( poi => ({...poi, showInfo: false}));
        this.showPendingPOIs = true;

        if (this.mapComponent) {
          this.mapComponent.setPuntosDeInteresPendientes(this.pendingPOIs);
        }

        if (pois.length === 0) {
          this.mostrarNoHayPois("No hay POIs pendientes");
        }
      },
      error: (err) => {
        console.error('Error al cargar POIs pendientes:', err);
      }
    });

    
  }


  loadApprovedPOIs(): void {
    this.poiRetrievalService.getApprovedPOIs().subscribe(
      (puntosAprobados: PointOfInterest[]) => {
        this.approvedPOIs = puntosAprobados;
      },
      (error) => {
        console.error('Error al obtener puntos de interés:', error);
      }
    );
  }


  removePOI(nombre: string) {
    this.pendingPOIs = this.pendingPOIs.filter((poi) => poi.nombre !== nombre);  
  }

  approvePOI(nombre: string) {
    this.poiModerationService.approvePOI(nombre).subscribe({
      next: (response) => {
        this.showConfirmation(`POI "${nombre}" aprobado`);
        const poiAprobado = this.pendingPOIs.find(poi => poi.nombre === nombre);
        if (poiAprobado) {
          this.approvedPOIs.push(poiAprobado); // Añadir a aprobados
          this.removePOI(nombre); // Quitar de pendientes
        }
      },
      error: (err) => {
        console.error('Error al aprobar POI:', err);
      }
    });
  }
  
  rejectPOI(nombre: string) {
    this.poiModerationService.rejectPOI(nombre).subscribe({
      next: (response) => {
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

  mostrarNoHayPois(message:string) {
    this.noHayPoisMensaje = message;
    setTimeout(() => (this.noHayPoisMensaje = null), 5000); 
  }

  ngOnInit(): void {
    // Cargar los POIs al inicio
    this.loadApprovedPOIs();
    if (this.mapComponent) {
      this.mapComponent.setPuntosDeInteresAprobados(this.approvedPOIs);
    }
    
  }
  
}

