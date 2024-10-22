import { Component, OnInit } from '@angular/core';
import { PoiService } from '../services/poi.service';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../map/map.component';

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

  constructor(private poiService: PoiService) {}

  ngOnInit(): void {
    // Obtener los puntos de interés del servicio
    this.poiService.getApprovedPOIs().subscribe(
      (puntos: PointOfInterest[]) => {
        this.puntosDeInteres = puntos; 
      },
      (error) => {
        console.error('Error al obtener puntos de interés:', error);
      }
    );
  }
}
