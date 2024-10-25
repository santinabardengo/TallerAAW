import { Component, OnInit, ViewChild } from '@angular/core';
import { PoiService } from '../services/poi.service';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../map/map.component';
import { Router, NavigationEnd } from '@angular/router';

interface PointOfInterest {
  nombre: string;
  ubicacion: string;
  descripcion: string;
  horarioApertura: string;
  horarioCierre: string;
}

@Component({
  selector: 'user-map',
  standalone: true,
  imports: [CommonModule, MapComponent],
  templateUrl: './user-map.component.html',
  styleUrls: ['./user-map.component.css']
})
export class UserMapComponent implements OnInit {
  puntosDeInteres: PointOfInterest[] = [];

  @ViewChild(MapComponent) mapComponent!: MapComponent;

  constructor(private poiService: PoiService, private router: Router) {}

  cargarPuntosDeInteres(): void {
    this.poiService.getApprovedPOIs().subscribe(
      (puntos: PointOfInterest[]) => {
        this.puntosDeInteres = puntos;

        // Asegurarse de actualizar los marcadores en el mapa
        if (this.mapComponent) {
          this.mapComponent.setPuntosDeInteres(puntos);
        }
      },
      (error) => {
        console.error('Error al obtener puntos de interés:', error);
      }
    );
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
    
  }
  
}
