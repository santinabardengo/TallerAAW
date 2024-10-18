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

  private listaDePOIs: (POI | Evento)[] = []; 
  private gestorBD: GestorBaseDeDatos;

  constructor() {
    this.gestorBD = new GestorBaseDeDatos();
    this.cargarDesdeBD();
  }

  // llamar al GestorBaseDeDatos para leer el archivo JSON y cargar los POIs
  private cargarDesdeBD(): void {
    const poisLeidos = this.gestorBD.leerArchivo('pois.json');
    if (poisLeidos) {
      this.listaDePOIs = poisLeidos;
      console.log('POIs cargados correctamente desde la base de datos.');
    } else {
      console.log('No se pudieron cargar los POIs desde la base de datos.');
    }
  }

  //llama a GestorBaseDeDatos para guardar los POIs en JSON
  private guardarEnBD(): void {
    this.gestorBD.guardarArchivo('pois.json', this.listaDePOIs);
  }

  crearPOI(datosPOI: DatosPOI): void {
    const { nombre, direccion, categoria, descripcion, horarioApertura, horarioCierre, fecha } = datosPOI;
    const status = 'pending';

    if (categoria === 'Lugar') {
      const nuevoPOI = new POI(nombre, direccion, categoria, descripcion, horarioApertura, horarioCierre, status);
      this.listaDePOIs.push(nuevoPOI);
    } else if (categoria === 'Evento') {
      if (!fecha) {
        throw new Error("La fecha es obligatoria para crear un evento.");
      }
      const nuevoEvento = new Evento(nombre, direccion, categoria, descripcion, horarioApertura, horarioCierre, status, fecha);
      this.listaDePOIs.push(nuevoEvento);
    }

    // Guardar en JSON cada vez que se agrega un nuevo POI
    this.guardarEnBD();
  }

  getPOIs(): (POI | Evento)[] {
    return this.listaDePOIs;
  }

  getPendingPOIs(): (POI | Evento)[] {
    return this.listaDePOIs.filter(poi => poi.getStatus() === 'pending');
  }

  actualizarEstadoPOI(nombre: string, nuevoEstado: string): boolean {
    const poi = this.listaDePOIs.find(poi => poi.getNombre() === nombre);
    
    if (poi) {
      poi.getStatus();
      this.guardarEnBD();  // Guardar los cambios en la base de datos
      return true;
    }
    return false;
  }
}
