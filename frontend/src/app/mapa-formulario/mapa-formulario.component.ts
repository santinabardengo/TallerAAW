import { Component, AfterViewInit, Inject, PLATFORM_ID, Input, Output, EventEmitter } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mapa-formulario',
  standalone: true,
  templateUrl: './mapa-formulario.component.html',
  styleUrls: ['./mapa-formulario.component.css']
})

export class MapaFormularioComponent implements AfterViewInit {
  @Output() ubicacionSeleccionada = new EventEmitter<{ lat: number, lng: number }>();

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
    const L = await import('leaflet');

    this.mapa = L.map('mapaFormulario').setView([-38.5937, -69.9954], 8); // Coordenadas de Neuquén

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.mapa);

    this.mapa.on('click', (e: any) => {

      const iconoPendiente = L.icon({
        iconUrl: '/assets/iconoPendiente.png',  
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      const { lat, lng } = e.latlng;
      if (this.marcador) {
        this.marcador.setLatLng([lat, lng]);  
      } else {
        this.marcador = L.marker([lat, lng], {icon: iconoPendiente}).addTo(this.mapa); 
      }

      this.ubicacionSeleccionada.emit({ lat, lng });
    });

  }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.cargarLeafletCSS();
      this.initMapa();
    }
  }

}

