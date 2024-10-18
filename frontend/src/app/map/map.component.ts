import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mapa',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  constructor(private router: Router) { }
  private mapa: any;

  // Método para inyectar el CSS de Leaflet en tiempo de ejecución
  private cargarLeafletCSS(): void {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; // URL de los estilos de Leaflet
    document.head.appendChild(link);
  }

  private async initMapa(): Promise<void> {
    const L = await import('leaflet'); // Importación dinámica de Leaflet

    this.mapa = L.map('mapa').setView([-38.9516, -68.0591], 13); // Coordenadas de Neuquén

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.mapa);
  }

  ngAfterViewInit(): void {
    this.cargarLeafletCSS(); // Inyectar el CSS antes de inicializar el mapa
    this.initMapa(); // Inicializar el mapa
  }

  navigateToForm() {
    this.router.navigate(['/formulario']);
  }
}
