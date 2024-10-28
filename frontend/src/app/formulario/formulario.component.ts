import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PoiCreationService } from '../services/poi-creation.service';
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

  camposFaltantes: string[] = []; // Lista de campos faltantes


  constructor(private poiCreationService: PoiCreationService, private router: Router, private messageService: MessageService, private route: ActivatedRoute) {
    const hoy = new Date();
    const fechaFormateada = hoy.toISOString().split('T')[0]; 
  }

  onUbicacionSeleccionada(event: { lat: number; lng: number }) {
    this.ubicacion = `${event.lat.toFixed(6)}, ${event.lng.toFixed(6)}`;
  }

  CambioCategoria() {
    this.mostrarFechaEvento = this.categoriaSeleccionada === 'evento';
  }

  esFormularioValido(): boolean {
    let noHayError:boolean = true;
    this.camposFaltantes = [];
    if (!this.nombre) this.camposFaltantes.push('nombre');
    if (!this.ubicacion) this.camposFaltantes.push('ubicacion');
    if (!this.descripcion) this.camposFaltantes.push('descripción');
    if (!this.horarioApertura) this.camposFaltantes.push('horario de apertura');
    if (!this.horarioCierre) this.camposFaltantes.push('horario de cierre');

    if (this.camposFaltantes.length > 0) {
      this.errorCamposFaltantes = `Debes completar los siguientes campos: ${this.camposFaltantes.join(', ')}`;
      noHayError = false;
    }

    // Validación de descripción
    if (this.descripcion.length > 150) {
      this.errorLongitudDesc = 'La descripción no puede exceder los 150 caracteres.';
      noHayError = false;
    }
   
    
    // Validación de horarios si ambos están completos

    if (this.fecha < this.fechaFormateada) {
      this.errorFecha = 'Fecha inválida';
      noHayError = false;
    }

    if (!this.errorCamposFaltantes && !this.errorLongitudDesc && !this.errorFecha){ // Sin errores
      noHayError = true;
    }

    return noHayError;
  }

  enviarFormulario() {
    if (!this.esFormularioValido()) {
      return; // No enviar si es inválido

    }

    const newPoi = {
      nombre: this.nombre,
      ubicacion: this.ubicacion,
      categoria: this.categoriaSeleccionada,
      descripcion: this.descripcion,
      horarioApertura: this.horarioApertura,
      horarioCierre: this.horarioCierre,
      fecha: this.mostrarFechaEvento ? this.fecha : null
    };
  
    this.poiCreationService.createPOI(newPoi).subscribe({
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