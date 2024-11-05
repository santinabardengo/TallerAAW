// src/app/services/base-poi.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasePoiService {
  protected baseUrl = 'http://localhost:3000/points-of-interest';

  constructor(protected http: HttpClient) { }
}
