import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule para *ngIf
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
    CommonModule, FormsModule
  ],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  categoriaSeleccionada = '';
  mostrarFechaEvento = false;
  horarioApertura = '';
  horarioCierre = '';

  CambioCategoria(){
    this.mostrarFechaEvento = this.categoriaSeleccionada === 'evento';
  }

}
