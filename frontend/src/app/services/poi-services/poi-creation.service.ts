import { Injectable } from '@angular/core';
import { BasePoiService } from './base-poi.service';

@Injectable({
  providedIn: 'root'
})
export class PoiCreationService extends BasePoiService {

  // Crear un nuevo POI
  createPOI(poiData: any) {
    console.log(poiData);
    return this.http.post(`${this.baseUrl}`, poiData);
  }
}
