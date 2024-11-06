import { Component, AfterViewInit, Input, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';


interface PointOfInterest {
  nombre: string;
  ubicacion: string;
  descripcion: string;
  horarioApertura: string;
  horarioCierre: string;
  imagenes?:any;
  fecha? : string;
}


@Component({
  selector: 'app-mapa',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'
  ]
})

export class MapComponent implements AfterViewInit {
  @Input() puntosDeInteresPendientes: PointOfInterest[] = [];
  @Input() puntosDeInteresAprobados: PointOfInterest[] = [];
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

      const iconoLugar = L.icon({
        iconUrl: '/assets/iconoLugar.png',  
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });
      
      const iconoPendiente = L.icon({
        iconUrl: '/assets/iconoPendiente.png',  
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      const iconoEvento= L.icon({
        iconUrl: '/assets/iconoEvento.png',  
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      this.marcador.clearLayers();  // Limpiar los marcadores previos
      const marcadoresAprobados = this.puntosDeInteresAprobados.map(punto => {
        const [lat, lng] = punto.ubicacion.split(',').map(coord => parseFloat(coord));
        const icono = punto.fecha ? iconoEvento : iconoLugar;
        

        
        const imagenesHtml = punto.imagenes?.map((imagen: string) => {
          // Reemplaza la ruta relativa con la URL completa del backend
          const imagenUrl = `http://localhost:3000${imagen.replace('./', '/')}`;
          return `<img src="${imagenUrl}" alt="${punto.nombre}" style="width: 200px; height: auto; display: inline-block; margin-right: 5px;">`;
        }).join('') || '';  // Unir todas las imágenes en una cadena de HTML
      
        const carruselHtml = `
        <div class = "carrusel" style="width: 100%; max-height: 300px; overflow-y: scroll; padding-right: 1px;">
          ${imagenesHtml}
        </div>
      `;

        return L.marker([lat, lng], { icon: icono }).bindPopup(`
          <strong>${punto.nombre}</strong><br>
          <p>${punto.descripcion}</p>
          ${punto.fecha ? `<p><strong>Fecha del evento:</strong> ${punto.fecha}</p>` : ''}
          <p><strong>Horario de apertura:</strong> ${punto.horarioApertura}</p>
          <p><strong>Horario de cierre:</strong> ${punto.horarioCierre}</p>
          <p><strong>Imagenes:</strong> </p>
          ${carruselHtml}
        `);
        });

      const marcadoresPendientes = this.puntosDeInteresPendientes.map(punto => {
        const [lat, lng] = punto.ubicacion.split(',').map(coord => parseFloat(coord));
        return L.marker([lat, lng], {icon: iconoPendiente}).bindPopup(`
          <strong>${punto.nombre}</strong><br>
          <p>${punto.descripcion}</p>
          ${punto.fecha ? `<p><strong>Fecha del evento:</strong> ${punto.fecha}</p>` : ''}
          <p><strong>Horario de apertura:</strong> ${punto.horarioApertura}</p>
          <p><strong>Horario de cierre:</strong> ${punto.horarioCierre}</p>
          ${punto.imagenes ? `<p><strong>Imagenes: </strong> ${punto.imagenes}</p>`: ''}
        `);
      });

      const todosLosMarcadores = [...marcadoresAprobados, ...marcadoresPendientes];
      todosLosMarcadores.forEach(marcador => marcador.addTo(this.marcador));
    }
  }
  
  public setPuntosDeInteresAprobados(puntos: PointOfInterest[]): void {
    this.puntosDeInteresAprobados = puntos;
    this.marcarPuntosDeInteres();
  }

  public setPuntosDeInteresPendientes(puntosPendientes: PointOfInterest[] ): void {
    this.puntosDeInteresPendientes = puntosPendientes;
    this.marcarPuntosDeInteres();
  }

  centrarEnPOI(nombre: string) {
    const poi = this.puntosDeInteresPendientes.find(punto => punto.nombre === nombre);

    if (poi && isPlatformBrowser(this.platformId)) {
      const [lat, lng] = poi.ubicacion.split(',').map(coord => parseFloat(coord));
      this.mapa.setView([lat, lng], 10); 
    
    // Encontrar y abrir el popup del marcador correspondiente
    this.marcador.eachLayer((layer: any) => {
      if (layer.getLatLng().lat === lat && layer.getLatLng().lng === lng) {
        layer.openPopup(); // Abre el popup del marcador
      }
    });
  } else {
    console.warn(`Punto de interés con nombre "${nombre}" no encontrado.`);
  }
  }

  ngAfterViewInit(): void {
    this.cargarLeafletCSS();
    this.initMapa();
  }

  
}
