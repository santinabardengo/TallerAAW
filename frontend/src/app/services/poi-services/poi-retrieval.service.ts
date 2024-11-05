import { Injectable } from '@angular/core';
import { BasePoiService } from './base-poi.service';

@Injectable({
  providedIn: 'root'
})
export class PoiRetrievalService extends BasePoiService {

  // Obtener POIs pendientes
  getPendingPOIs() {
    return this.http.get<any[]>(`${this.baseUrl}/pending`);
  }

  // Obtener POIs aprobados
  getApprovedPOIs() {
    return this.http.get<any[]>(`${this.baseUrl}/approved`);
  }
}
