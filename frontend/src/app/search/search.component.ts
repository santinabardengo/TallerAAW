import { Component, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PoiSearchService } from '../services/search.service';
import { PoiRetrievalService } from '../services/poi-services/poi-retrieval.service';

interface PointOfInterest {
  nombre: string;
  ubicacion: string;
  descripcion: string;
  horarioApertura: string;
  horarioCierre: string;
  imagenes: any;
  fecha ?: string;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Input() term: string = '';
  @Output() searchEvent = new EventEmitter<PointOfInterest[]>();

  searchResults: any[] = [];
  approvedPOIs: PointOfInterest[] = [];

  constructor(private poiSearchService: PoiSearchService, private poiRetrievalService: PoiRetrievalService) {}

  onSearch(term: string) {

    this.poiRetrievalService.getApprovedPOIs().subscribe(
      (puntosAprobados: PointOfInterest[]) => {
        this.approvedPOIs = puntosAprobados;
        this.searchResults = term
         ? this.approvedPOIs.filter(poi =>
            poi.nombre.toLowerCase().includes(term.toLowerCase())
          )
          : [];
        this.searchEvent.emit(this.searchResults);
      },
      (error) => {
        console.error('Error al obtener puntos de interés:', error);
      }
    );
  }

}
