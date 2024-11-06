import { Component, OnInit, ViewChild } from '@angular/core';
import { PoiRetrievalService } from '../services/poi-services/poi-retrieval.service';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../map/map.component';
import { Router, NavigationEnd } from '@angular/router';
import { MessageService } from '../services/message.service';

interface PointOfInterestApproved {
  nombre: string;
  ubicacion: string;
  descripcion: string;
  horarioApertura: string;
  horarioCierre: string;
  imagenes: any;
  fecha? : string;
}

@Component({
  selector: 'user-map',
  standalone: true,
  imports: [CommonModule, MapComponent],
  templateUrl: './user-map.component.html',
  styleUrls: ['./user-map.component.css']
})

export class UserMapComponent implements OnInit {
  puntosDeInteresAprobados: PointOfInterestApproved[] = [];

  @ViewChild(MapComponent) mapComponent!: MapComponent;


  constructor(private poiRetrievalService: PoiRetrievalService, private router: Router, private messageService: MessageService) {}
  mostrarMensajeConfirmacion : boolean = false;
  mensajeConfirmacion: string | null = null;

  cargarPuntosDeInteres(): void {
    this.poiRetrievalService.getApprovedPOIs().subscribe(
      (puntos: PointOfInterestApproved[]) => {
        this.puntosDeInteresAprobados = puntos;

        // Asegurarse de actualizar los marcadores en el mapa
        if (this.mapComponent) {
          this.mapComponent.setPuntosDeInteresAprobados(puntos);
        }
      },
      (error) => {
        console.error('Error al obtener puntos de interés:', error);
      }
    );
  }
  showConfirmation(message: string) {
    this.mensajeConfirmacion = message;
    setTimeout(() => (this.mensajeConfirmacion = null), 5000); // Desaparece en 3 segundos
  }

  mostrarMensaje(): void{
    if(this.mostrarMensajeConfirmacion)
      this.showConfirmation('Puntos de interés cargados con éxito');
  }
  navigateToForm() {
    this.router.navigate(['/formulario'], { queryParams: { from: 'user-map' } });
  }
  ngOnInit(): void {
    // Cargar los POIs al inicio
    this.cargarPuntosDeInteres();
    // Recargar POIs si el usuario vuelve a esta vista
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.cargarPuntosDeInteres();
      }
    });
    
    this.messageService.mensaje$.subscribe(mensaje => {
      this.mensajeConfirmacion = mensaje;
      console.log('Mensaje recibido:', mensaje); 
      if (mensaje) {
        setTimeout(() => this.messageService.clearMensaje(), 5000); // Borra el mensaje después de 5 segundos
      }
    });
  }
  
}
