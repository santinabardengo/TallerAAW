// src/app/services/poi-services/poi-search.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PoiSearchService {
  private apiUrl = `${environment.apiUrl}/api/search`; // Adjust if needed

  constructor(private http: HttpClient) {}

  searchPOI(term: string): Observable<any[]> {
    const params = new HttpParams().set('term', term);
    return this.http.get<any[]>(this.apiUrl, { params });
  }
}
