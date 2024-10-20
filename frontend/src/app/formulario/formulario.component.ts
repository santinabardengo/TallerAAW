import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PoiService } from '../services/poi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  categoriaSeleccionada = '';
  mostrarFechaEvento = false;
  horarioApertura = '';
  horarioCierre = '';
  nombre = '';
  direccion = '';
  descripcion = '';
  fechaEvento = '';
  errorCamposFaltantes = '';
  errorLongitudDesc = ''; 
  errorHorario = '';

  camposFaltantes: string[] = []; // Lista de campos faltantes

  constructor(private poiService: PoiService, private router: Router) {}

  CambioCategoria() {
    this.mostrarFechaEvento = this.categoriaSeleccionada === 'evento';
  }

  esFormularioValido(): boolean {
    let noHayError:boolean = true;
    this.camposFaltantes = [];
    if (!this.nombre) this.camposFaltantes.push('nombre');
    if (!this.direccion) this.camposFaltantes.push('dirección');
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
    if (this.horarioApertura && this.horarioCierre && this.horarioApertura >= this.horarioCierre) {
      this.errorHorario = 'El horario de apertura debe ser menor que el de cierre.';
      noHayError = false;
    }

    if (!this.errorCamposFaltantes && !this.errorLongitudDesc && !this.errorHorario){ // Sin errores
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
      direccion: this.direccion,
      categoria: this.categoriaSeleccionada,
      descripcion: this.descripcion,
      horarioApertura: this.horarioApertura,
      horarioCierre: this.horarioCierre,
      fechaEvento: this.mostrarFechaEvento ? this.fechaEvento : null
    };

    this.poiService.createPOI(newPoi).subscribe({
      next: (response) => {
        console.log('POI creado', response);
        this.router.navigate(['/map']);
      },
      error: (err) => console.error('Error al crear POI', err)
    });
  }
}
