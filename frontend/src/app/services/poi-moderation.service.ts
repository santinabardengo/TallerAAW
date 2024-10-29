import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PoiModerationService {

  private baseUrl = 'http://localhost:3000/points-of-interest';


  constructor(private http: HttpClient) { }

  // Aprobar un POI
  approvePOI(nombre: string) {
    return this.http.post(`${this.baseUrl}/${encodeURIComponent(nombre)}/approve`, {});
  }

  // Rechazar un POI
  rejectPOI(nombre: string) {
    return this.http.post(`${this.baseUrl}/${nombre}/reject`, {});
  }
}
