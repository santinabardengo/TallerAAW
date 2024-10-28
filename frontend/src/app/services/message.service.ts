import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private mensajeSubject = new BehaviorSubject<string | null>(null);
  mensaje$ = this.mensajeSubject.asObservable();

  setMensaje(mensaje: string) {
    this.mensajeSubject.next(mensaje);
  }

  clearMensaje() {
    this.mensajeSubject.next(null);
  }
}
