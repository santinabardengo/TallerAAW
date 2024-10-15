import { POI } from './poi.ts'; // Importamos la clase POI
import { Evento } from './evento.ts'; // Importamos la clase Evento
import fs from 'fs'; //esto es para los archivos 

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

   // Función para escribir pois en el json
   private guardarEnJSON(): void {
    const data = JSON.stringify(
        this.listaDePOIs.map(poi => ({
            nombre: poi.getNombre(),
            direccion: poi.getDireccion(),
            categoria: poi.getCategoria(),
            descripcion: poi.getDescripcion(),
            horarioApertura: poi.getHorarioApertura(),
            horarioCierre: poi.getHorarioCierre(),
            status: poi.getStatus(),
            ...(poi instanceof Evento && { fecha: poi.getFecha() }) // Si es un evento, agregar la fecha
        })),
        null,
        2
    );

    fs.writeFileSync('pois.json', data, 'utf-8');
}


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
    // Guardar en JSON cada vez que se agrega un nuevo POI
    this.guardarEnJSON();
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

