// src/app/services/base-poi.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BasePoiService {
  protected baseUrl = `${environment.apiUrl}/points-of-interest`;

  constructor(protected http: HttpClient) { }
}
