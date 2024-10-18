import { POI } from './poi.ts'; // Importamos la clase POI
import { Evento } from './evento.ts'; // Importamos la clase Evento
import fs from 'fs'; //esto es para los archivos 
import { GestorBaseDeDatos } from './gestordata.ts';

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
  private gestorBD: GestorBaseDeDatos;

  constructor() {
    this.gestorBD = new GestorBaseDeDatos();
  }

  //llama al gestor para que escriba en el json
  private guardarEnJSON(): void {
    const data = this.listaDePOIs.map(poi => ({
        nombre: poi.getNombre(),
        direccion: poi.getDireccion(),
        categoria: poi.getCategoria(),
        descripcion: poi.getDescripcion(),
        horarioApertura: poi.getHorarioApertura(),
        horarioCierre: poi.getHorarioCierre(),
        status: poi.getStatus(),
        ...(poi instanceof Evento && { fecha: poi.getFecha() })
    }));

    // llamar al GestorBaseDeDatos para que guarde el archivo
    this.gestorBD.guardarArchivo('pois.json', data);
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

  public leerArchivo(): void {
    const poisLeidos = this.gestorBD.leerArchivo('pois.json');
    if (poisLeidos) {
      this.listaDePOIs = poisLeidos;
      console.log('Archivo JSON leído correctamente');
    }
  }

  getPOIs(): (POI | Evento)[] {
    this.leerArchivo()
    return this.listaDePOIs;
  }

  getPendingPOIs(): (POI | Evento)[] {
    this.leerArchivo()
    return this.listaDePOIs.filter(poi => 'status' in poi && poi.status === 'pending');
  }
  
  actualizarEstadoPOI(nombre: string, nuevoEstado: string): boolean {
      const poi = this.listaDePOIs.find(poi => 'nombre' in poi && poi.nombre === nombre);
    
      if (poi && 'status' in poi ) {
        poi.status = nuevoEstado;
        this.guardarEnJSON();
        return true;
      }
      return false;
    }

    
}

