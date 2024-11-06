import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PoiCreationService } from '../services/poi-services/poi-creation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MapaFormularioComponent } from '../mapa-formulario/mapa-formulario.component';
import { UserMapComponent } from '../user-map/user-map.component';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule, MapaFormularioComponent, UserMapComponent],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})

export class FormularioComponent {
  categoriaSeleccionada = '';
  mostrarFechaEvento = false;
  horarioApertura = '';
  horarioCierre = '';
  nombre = '';
  ubicacion : string | null = null;
  descripcion = '';
  fecha = '';
  errorCamposFaltantes = '';
  errorLongitudDesc = ''; 
  errorFecha = '';
  fechaFormateada = '';
  mensajeConfirmacion: string | null = null;
  from: string | null = null;
  imagenes: File[] = [];

  constructor(private poiCreationService: PoiCreationService, private router: Router, private messageService: MessageService, private route: ActivatedRoute) {
    const hoy = new Date();
    this.fechaFormateada = hoy.toISOString().split('T')[0]; 
  }

  onUbicacionSeleccionada(event: { lat: number; lng: number }) {
    this.ubicacion = `${event.lat.toFixed(6)}, ${event.lng.toFixed(6)}`;
  }

  onImagenSeleccionada(event: any) {
    const archivos = event.target.files;
    this.imagenes = Array.from(archivos);
  }

  CambioCategoria() {
    this.mostrarFechaEvento = this.categoriaSeleccionada === 'evento';
  }

  esFormularioValido(): boolean {
    let noHayError:boolean = true;

    // Validación de descripción
    if (this.descripcion.length > 150) {
      this.errorLongitudDesc = 'La descripción no puede exceder los 150 caracteres.';
      noHayError = false;
    }
   
    // Validación de horarios si ambos están completos

    if (this.mostrarFechaEvento && (!this.fecha || this.fecha < this.fechaFormateada)) {
      this.errorFecha = 'Fecha inválida';
      noHayError = false;
    }else{
      this.errorFecha = '';
    }

    return noHayError;
  }


  enviarFormulario() {
    if (!this.esFormularioValido()) {
      return; // No enviar si es inválido
    }

    const formData = new FormData(); 
    formData.append('nombre', this.nombre);
    formData.append('ubicacion', this.ubicacion || '');
    formData.append('categoria', this.categoriaSeleccionada);
    formData.append('descripcion', this.descripcion);
    formData.append('horarioApertura', this.horarioApertura);
    formData.append('horarioCierre', this.horarioCierre);
    formData.append('fecha', this.mostrarFechaEvento ? this.fecha : '');
  
    this.imagenes.forEach(imagen => {
      formData.append('images', imagen, imagen.name); 
    });

    this.poiCreationService.createPOI(formData).subscribe({
      next: (response) => {
        console.log('POI creado', response);
        this.messageService.setMensaje('Su POI está pendiente de aprobación.');
        if (this.from === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user-map']);
        }
        
      },
      error: (err) => console.error('Error al crear POI', err)

    });
  }
  
  showConfirmation(message: string) {
    this.mensajeConfirmacion = message;
    setTimeout(() => (this.mensajeConfirmacion = null), 5000); // Desaparece en 3 segundos
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.from = params['from'] || 'user-map'; // Por defecto, redirige a 'user-map'
    });
  }

  

  

}