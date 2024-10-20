import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule para *ngIf
import { FormsModule } from '@angular/forms'; 
import { PoiService } from '../services/poi.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
    CommonModule, FormsModule
  ],
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

  constructor(private poiService: PoiService, private router: Router){}

  CambioCategoria(){
    console.log('Categoría seleccionada:', this.categoriaSeleccionada);
    this.mostrarFechaEvento = this.categoriaSeleccionada === 'evento';
    console.log('Mostrar Fecha del Evento:', this.mostrarFechaEvento);
  }
  
  //enviar el formulario cuando se copmlete

  enviarFormulario(){
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
        console.log("POI creado", response);
        this.router.navigate(['/map']);
      },
      error: (err) => {
      console.error("error al crear poi", err);
    }
    });
  }

}
