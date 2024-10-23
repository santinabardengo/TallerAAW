import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  private apiUrl = 'https://nominatim.openstreetmap.org/search?format=json&q=';

  constructor(private http: HttpClient) {}

  geocodeDireccion(direccion: string): Observable<{ lat: number, lon: number }> {
    const url = `${this.apiUrl}${encodeURIComponent(direccion)}`;

    return this.http.get<any[]>(url).pipe(
      map(resultados => {
        if (resultados.length > 0) {
          const lat = parseFloat(resultados[0].lat);
          const lon = parseFloat(resultados[0].lon);
          return { lat, lon };
        } else {
          throw new Error('No se encontraron coordenadas para la dirección ingresada.');
        }
      }),
      catchError(error => {
        console.error('Error en la búsqueda de la dirección:', error);
        return throwError(() => new Error('Error en la búsqueda de la dirección'));
      })
    );
  }
}
