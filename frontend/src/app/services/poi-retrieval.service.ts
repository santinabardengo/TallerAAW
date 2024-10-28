import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PoiRetrievalService {

  private baseUrl = 'http://localhost:3000/points-of-interest';
  ;

  constructor(private http: HttpClient) { }

  // Obtener POIs pendientes
  getPendingPOIs() {
    return this.http.get<any[]>(`${this.baseUrl}/pending`);
  }

  // Obtener POIs aprobados
  getApprovedPOIs() {
    return this.http.get<any[]>(`${this.baseUrl}/approved`);
  }
}
