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
    return this.http.post(`${this.baseUrl}`, poiData);
  }

  // Obtener todos los POIs
  getPendingPOIs() {
    return this.http.get<any[]>(`${this.baseUrl}/pending`);
  }

  // Aprobar un POI
  approvePOI(nombre: string) {
    return this.http.post(`${this.baseUrl}/${nombre}/approve`, {});
  }

  // Rechazar un POI
  rejectPOI(nombre: string) {
    return this.http.post(`${this.baseUrl}/${nombre}/reject`, {});
  }
}
