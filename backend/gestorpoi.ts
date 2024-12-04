import { POI } from './poi'; 
import { Evento } from './evento'; 
import { GestorBaseDeDatos } from './gestordata';

interface DatosPOI {
  nombre: string;
  ubicacion: string;
  categoria: string;
  descripcion: string;
  horarioApertura: string;
  horarioCierre: string;
  imagenes?: string[]; 
  status: string;
  fecha?: string;
}

export class GestorDePOIs {

  private gestorBD: GestorBaseDeDatos;

  constructor() {
    this.gestorBD = new GestorBaseDeDatos();
  }


  crearPOI(datosPOI: DatosPOI): void {
    const { nombre, ubicacion, categoria, descripcion, horarioApertura, horarioCierre, imagenes, fecha } = datosPOI;
    const status = 'pending';

    if (categoria === 'lugar') {
      const nuevoPOI = new POI(nombre, ubicacion, categoria, descripcion, horarioApertura, horarioCierre,imagenes,status);
      this.gestorBD.guardarPoiArchivo('pois.json', nuevoPOI);
    } else if (categoria === 'evento') {
      if (!fecha) {
        throw new Error("La fecha es obligatoria para crear un evento.");
      }
      const nuevoEvento = new Evento(nombre, ubicacion, categoria, descripcion, horarioApertura, horarioCierre,imagenes,fecha,status);

      this.gestorBD.guardarPoiArchivo('pois.json', nuevoEvento);
    }

  }

  getPOIs(): (POI | Evento)[] {
    return this.gestorBD.leerArchivo("pois.json")
  }

  getPendingPOIs(): (POI | Evento)[] {
    return this.gestorBD.leerArchivo('pois.json').filter(poi => poi.getStatus() === 'pending');
  }

  getApprovedPOIs(): (POI | Evento)[] {
    return this.gestorBD.leerArchivo('pois.json').filter(poi => poi.getStatus() === 'approved');
  }

  actualizarEstadoPOI(nombre: string, nuevoEstado: string): boolean {
    const poi = this.gestorBD.leerArchivo('pois.json').find(poi => poi.getNombre() === nombre);
    if (poi) {
      poi.setStatus(nuevoEstado);
      this.gestorBD.guardarPoiArchivo('pois.json', poi)
      return true;
    }
    return false;
  }
}
