import { GestorDePOIs } from './gestorpoi'; 

export class Admin {
  private gestor: GestorDePOIs;
  constructor(gestor: GestorDePOIs) {
    this.gestor = gestor;
  }

  aprobarPOI(nombre: string): boolean {
    return this.gestor.actualizarEstadoPOI(nombre, 'approved');
  }

  rechazarPOI(nombre: string): boolean {
    return this.gestor.actualizarEstadoPOI(nombre, 'rejected');
  }
}
