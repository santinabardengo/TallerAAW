import { POI } from './poi'; // Importamos la clase POI
import { Evento } from './evento'; // Importamos la clase Evento
import { GestorBaseDeDatos } from './gestordata'; // Importamos el gestor de base de datos

interface DatosPOI {
  nombre: string;
  direccion: string;
  categoria: string;
  descripcion: string;
  horarioApertura: string;
  horarioCierre: string;
  fecha?: string;
  status: string;
}

export class GestorDePOIs {

  //private listaDePOIs: (POI | Evento)[] = []; 
  private gestorBD: GestorBaseDeDatos;

  constructor() {
    this.gestorBD = new GestorBaseDeDatos();
  }


  crearPOI(datosPOI: DatosPOI): void {
    const { nombre, direccion, categoria, descripcion, horarioApertura, horarioCierre, fecha } = datosPOI;
    const status = 'pending';

    if (categoria === 'Lugar') {
      const nuevoPOI = new POI(nombre, direccion, categoria, descripcion, horarioApertura, horarioCierre, status);
      this.gestorBD.guardarPoiArchivo('pois.json', nuevoPOI);
    } else if (categoria === 'Evento') {
      if (!fecha) {
        throw new Error("La fecha es obligatoria para crear un evento.");
      }
      const nuevoEvento = new Evento(nombre, direccion, categoria, descripcion, horarioApertura, horarioCierre, status, fecha);
      this.gestorBD.guardarPoiArchivo('pois.json', nuevoEvento);
    }

  }

  getPOIs(): (POI | Evento)[] {
    return this.gestorBD.leerArchivo("pois.json")
  }

  getPendingPOIs(): (POI | Evento)[] {
    return this.gestorBD.leerArchivo('pois.json').filter(poi => poi.getStatus() === 'pending');
  }

  actualizarEstadoPOI(nombre: string, nuevoEstado: string): boolean {
    const poi = this.gestorBD.leerArchivo('pois.json').find(poi => poi.getNombre() === nombre);
    if (poi) {
      poi.setStatus(nuevoEstado);
      return true;
    }
    return false;
  }
}
