import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PoiService {

  private baseUrl = 'http://localhost:3000/points-of-interest';
  ;

  constructor(private http: HttpClient) { }

  // Crear un nuevo POI
  createPOI(poiData: any) {
    console.log(poiData);
    return this.http.post(`${this.baseUrl}`, poiData);
  }

  // Obtener POIs pendientes
  getPendingPOIs() {
    return this.http.get<any[]>(`${this.baseUrl}/pending`);
  }

  // Obtener POI aprobados pendientes
  getApprovedPOIs() {
    return this.http.get<any[]>(`${this.baseUrl}/approved`);
  }

  // Aprobar un POI
  approvePOI(nombre: string) {
    return this.http.post(`${this.baseUrl}/${encodeURIComponent(nombre)}/approve`, {});
  }

  // Rechazar un POI
  rejectPOI(nombre: string) {
    return this.http.post(`${this.baseUrl}/${nombre}/reject`, {});
  }
}
