import { Component, AfterViewInit, Input, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';


interface PointOfInterest {
  nombre: string;
  ubicacion: string;
  descripcion: string;
  horarioApertura: string;
  horarioCierre: string;
}

@Component({
  selector: 'app-mapa',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'
  ]
})
export class MapComponent implements AfterViewInit {
  @Input() puntosDeInteres: PointOfInterest[] = [];
  private mapa: any;
  private marcador: any;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
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
    if (isPlatformBrowser(this.platformId)) {
      const L = await import('leaflet');

      this.mapa = L.map('mapa').setView([-38.5937, -69.9954], 8);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.mapa);

      this.marcador = L.layerGroup().addTo(this.mapa);
  
      // Marcar los puntos de interés después de inicializar el mapa
      this.marcarPuntosDeInteres();
    }
  }

  private marcarPuntosDeInteres(): void {
    if (isPlatformBrowser(this.platformId)) {
      const L = (window as any).L; // Asegúrate de que estamos en el navegador

      this.marcador.clearLayers();  // Limpiar los marcadores previos
      const marcadores = this.puntosDeInteres.map(punto => {
        const [lat, lng] = punto.ubicacion.split(',').map(coord => parseFloat(coord));
        return L.marker([lat, lng]).bindPopup(`
          <strong>${punto.nombre}</strong><br>
          <p>${punto.descripcion}</p>
          <p><strong>Horario de apertura:</strong> ${punto.horarioApertura}</p>
          <p><strong>Horario de cierre:</strong> ${punto.horarioCierre}</p>
        `);
      });

      marcadores.forEach(marcador => marcador.addTo(this.marcador));
    }
  }
  
  public setPuntosDeInteres(puntos: PointOfInterest[]): void {
    this.puntosDeInteres = puntos;
    this.marcarPuntosDeInteres();
  }

  ngAfterViewInit(): void {
    this.cargarLeafletCSS();
    this.initMapa();
  }

  navigateToForm() {
    this.router.navigate(['/formulario']);
  }
}
