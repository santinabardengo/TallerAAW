import { POI } from './poi'; // Importamos la clase POI
import { Evento } from './evento'; // Importamos la clase Evento

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

  private listaDePOIs: (POI | Evento)[] = []; 


  crearPOI(datosPOI: DatosPOI): void {
    const { nombre, direccion, categoria, descripcion, horarioApertura, horarioCierre, fecha } = datosPOI;
    const status = 'pending';

    if(categoria == 'Lugar'){
      const nuevoPOI = new POI(nombre, direccion, categoria, descripcion, horarioApertura, horarioCierre, status);
      this.listaDePOIs.push(nuevoPOI);
    }
    if(categoria == 'Evento'){
      if (!fecha) {
        throw new Error("La fecha es obligatoria para crear un evento."); // Verificación de la fecha
      }
      const nuevoEvento = new Evento(nombre, direccion, categoria, descripcion, horarioApertura, horarioCierre, status, fecha);
      this.listaDePOIs.push(nuevoEvento);
    }

  }

  getPOIs(): (POI | Evento)[] {
    return this.listaDePOIs;
  }

  getPendingPOIs(): (POI | Evento)[] {
    return this.listaDePOIs.filter(poi => 'status' in poi && poi.status === 'pending');
  }
  
  actualizarEstadoPOI(nombre: string, nuevoEstado: string): boolean {
      const poi = this.listaDePOIs.find(poi => 'nombre' in poi && poi.nombre === nombre);
    
      if (poi && 'status' in poi ) {
        poi.status = nuevoEstado;
        return true;
      }
      return false;
    }
    
}

