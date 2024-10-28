import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PoiCreationService {

  private baseUrl = 'http://localhost:3000/points-of-interest';
  ;

  constructor(private http: HttpClient) { }

  // Crear un nuevo POI
  createPOI(poiData: any) {
    console.log(poiData);
    return this.http.post(`${this.baseUrl}`, poiData);
  }
}
