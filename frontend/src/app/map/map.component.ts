import { Component, AfterViewInit, Input, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { SearchComponent } from '../search/search.component'


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
  styleUrls: ['./map.component.css']
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
      const L = (window as any).L; 

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
          const imagenUrl = `http://localhost:3000${imagen.replace('./', '/')}`;
          return `<img src="${imagenUrl}" alt="${punto.nombre}" style="width: 200px; height: auto; object-fit: cover; display: inline-block; border-radius: 8px; justify-items:center;">`;
        }).join('') || ''; 
      
        const carruselHtml = `
          <div style="
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 10px;
            overflow-x: scroll;
            overflow-y: hidden;
            padding: 0px 10px 10px 0px;
            width: 100%;
            max-height: 300px;
          ">
            ${imagenesHtml}
          </div>
        `;

        const customScrollbarStyle = `
          <style>
            div::-webkit-scrollbar {
              height: 8px; /* Barra horizontal fina */
            }
            div::-webkit-scrollbar-track {
              background-color: transparent; /* Fondo transparente (sin flechas) */
            }
            div::-webkit-scrollbar-thumb {
              background-color: #457B9D; /* Color de la barra */
              border-radius: 10px; /* Forma redondeada */
              border: 2px solid #f1f1f1
            }
            div::-webkit-scrollbar-thumb:hover {
              background-color: #233a66;; /* Color de la barra al pasar el cursor */
            }
          </style>
        `;

        const imagenesSection = punto.imagenes && punto.imagenes.length > 0
          ? `<p style="font-family: 'Montserrat', sans-serif; margin-bottom: 12px;"><strong>Imagenes:</strong></p>`
          : '';  // Si no tiene imágenes, no se agrega nada


        return L.marker([lat, lng], { icon: icono }).bindPopup(`
          <strong style = "font-size: 20px; font-weight: bold; font-family: 'Montserrat', sans-serif;">${punto.nombre}</strong><br>
          <p style="font-family: 'Montserrat', sans-serif;">${punto.descripcion}</p>
          ${punto.fecha ? `<p style="font-family: 'Montserrat', sans-serif;"><strong>Fecha del evento:</strong> ${punto.fecha}</p>` : ''}
          <p style="font-family: 'Montserrat', sans-serif;"><strong>Horario de apertura:</strong> ${punto.horarioApertura}</p>
          <p style="font-family: 'Montserrat', sans-serif;"><strong>Horario de cierre:</strong> ${punto.horarioCierre}</p>
          ${imagenesSection}
          ${carruselHtml}
          ${customScrollbarStyle}
        `);
        });

      const marcadoresPendientes = this.puntosDeInteresPendientes.map(punto => {
        const [lat, lng] = punto.ubicacion.split(',').map(coord => parseFloat(coord));
        
        const imagenesHtml = punto.imagenes?.map((imagen: string) => {
          const imagenUrl = `http://localhost:3000${imagen.replace('./', '/')}`;
          return `<img src="${imagenUrl}" alt="${punto.nombre}" style="width: 200px; height: auto; object-fit: cover; display: inline-block; border-radius: 8px; justify-items:center;">`;
        }).join('') || '';

        const carruselHtml = `
          <div style="
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 10px;
            overflow-x: scroll;
            overflow-y: hidden;
            padding: 0px 10px 10px 0px;
            width: 100%;
            max-height: 300px;
          ">
            ${imagenesHtml}
          </div>
        `;

        const customScrollbarStyle = `
          <style>
            div::-webkit-scrollbar {
              height: 8px; /* Barra horizontal fina */
            }
            div::-webkit-scrollbar-track {
              background-color: transparent; /* Fondo transparente (sin flechas) */
            }
            div::-webkit-scrollbar-thumb {
              background-color: #457B9D; /* Color de la barra */
              border-radius: 10px; /* Forma redondeada */
              border: 2px solid #f1f1f1
            }
            div::-webkit-scrollbar-thumb:hover {
              background-color: #233a66;; /* Color de la barra al pasar el cursor */
            }
          </style>
        `;

        const imagenesSection = punto.imagenes && punto.imagenes.length > 0
          ? `<p style="font-family: 'Montserrat', sans-serif; margin-bottom: 12px;"><strong>Imagenes:</strong></p>`
          : '';  // Si no tiene imágenes, no se agrega nada


        return L.marker([lat, lng], {icon: iconoPendiente}).bindPopup(`
          <strong style = "font-size: 20px; font-weight: bold; font-family: 'Montserrat', sans-serif;">${punto.nombre}</strong><br>
          <p style="font-family: 'Montserrat', sans-serif;">${punto.descripcion}</p>
          ${punto.fecha ? `<p style="font-family: 'Montserrat', sans-serif;"><strong>Fecha del evento:</strong> ${punto.fecha}</p>` : ''}
          <p style="font-family: 'Montserrat', sans-serif;"><strong>Horario de apertura:</strong> ${punto.horarioApertura}</p>
          <p style="font-family: 'Montserrat', sans-serif;"><strong>Horario de cierre:</strong> ${punto.horarioCierre}</p>
          ${imagenesSection}
          ${carruselHtml}
          ${customScrollbarStyle}
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
    const poi = this.puntosDeInteresPendientes.find(punto => punto.nombre === nombre)
                || this.puntosDeInteresAprobados.find(punto => punto.nombre === nombre);  
    
    if (poi && isPlatformBrowser(this.platformId)) {
      const [lat, lng] = poi.ubicacion.split(',').map(coord => parseFloat(coord));
      this.mapa.setView([lat, lng], 10); 
    
    // Encontrar y abrir el popup del marcador correspondiente
    this.marcador.eachLayer((layer: any) => {
      if (layer.getLatLng().lat === lat && layer.getLatLng().lng === lng) {
        layer.openPopup(); 
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
