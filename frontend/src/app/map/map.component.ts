import { Component, AfterViewInit, Inject, PLATFORM_ID, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GeocodingService } from '../services/geocodificacion.service';
import { Router } from '@angular/router';

interface PointOfInterest {
  name: string;
  description: string;
  direccion: string;
  horarioApertura: string;
  horarioCierre: string;
}

@Component({
  selector: 'app-mapa',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {
  @Input() puntosDeInteres: PointOfInterest[] = [];  // Input para recibir los puntos de interés

  private mapa: any;
  private marcador: any;

  constructor(
    private router: Router,
    private geocodingService: GeocodingService,
    @Inject(PLATFORM_ID) private platformId: Object // Detectar la plataforma
  ) {}

  private cargarLeafletCSS(): void {
    if (isPlatformBrowser(this.platformId)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }
  }

  private async initMapa(): Promise<void> {
    const L = await import('leaflet');

    this.mapa = L.map('mapa').setView([-38.5937, -69.9954], 8); // Coordenadas de Neuquén

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.mapa);

    this.marcador = L.layerGroup().addTo(this.mapa);

    // Agregar marcadores para todos los puntos de interés recibidos
    this.marcarPuntosDeInteres();
  }

  private marcarPuntosDeInteres(): void {
    const L = (window as any).L;
    // Iterar sobre los puntos de interés y añadir un marcador para cada uno
    this.puntosDeInteres.forEach((punto) => {
      this.buscarDireccion(punto)
    });
  }

  agregarMarcador(lat: number, lng: number, punto: PointOfInterest): void {
    const L = (window as any).L;
    const marcador = L.marker([lat, lng]).addTo(this.marcador);
    marcador.bindPopup(`<strong>${punto.name}</strong><br>${punto.description}`).openPopup();
  }

  buscarDireccion(punto: PointOfInterest): void {
    this.geocodingService.geocodeDireccion(punto.direccion).subscribe(
      (coordenadas) => {
        this.agregarMarcador(coordenadas.lat, coordenadas.lon, punto);
        this.mapa.setView([coordenadas.lat, coordenadas.lon], 13); // Centrar el mapa
      },
      (error) => {
        console.error('Error al buscar la dirección:', error);
      }
    );
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.cargarLeafletCSS();
      this.initMapa();
    }
  }

  navigateToForm() {
    this.router.navigate(['/formulario']);
  }
}
