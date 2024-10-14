import { GestorDePOIs } from './gestorpoi'; // Asegúrate de la ruta correcta

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
