import { Injectable } from '@angular/core';
import { BasePoiService } from './base-poi.service';

@Injectable({
  providedIn: 'root'
})
export class PoiModerationService extends BasePoiService{

  // Aprobar un POI
  approvePOI(nombre: string) {
    return this.http.post(`${this.baseUrl}/${encodeURIComponent(nombre)}/approve`, {});
  }

  // Rechazar un POI
  rejectPOI(nombre: string) {
    return this.http.post(`${this.baseUrl}/${nombre}/reject`, {});
  }
}
