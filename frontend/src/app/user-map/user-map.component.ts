import { Component, OnInit } from '@angular/core';
import { PoiService } from '../services/poi.service';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../map/map.component';
import { Router, NavigationEnd } from '@angular/router';

interface PointOfInterest {
  nombre: string;
  descripcion: string;
  direccion: string;
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

  constructor(private poiService: PoiService, private router: Router) {}
  cargarPuntosDeInteres(): void {
    this.poiService.getApprovedPOIs().subscribe(
      (puntos: PointOfInterest[]) => {
        this.puntosDeInteres = puntos;
      },
      (error) => {
        console.error('Error al obtener puntos de interés:', error);
      }
    );
  }
  ngOnInit(): void {
    // Inicialmente cargamos los POIs
    this.cargarPuntosDeInteres();

    // Escuchar cuando el usuario navega de vuelta a este componente
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Cuando la navegación termina (ej. regresando a este componente)
        this.cargarPuntosDeInteres();
      }
    });
  }


}
