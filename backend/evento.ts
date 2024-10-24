import { POI } from './poi';

  export class Evento extends POI {
    #fecha: string;
  
    constructor(
      nombre: string = '',
      direccion: string = '',
      categoria: string = '',
      descripcion: string = '',
      horarioApertura: string = '',
      horarioCierre: string = '',
      fecha: string = '',
      status: string = 'pending', 
      
      
    ) {
      super(nombre, direccion, categoria, descripcion, horarioApertura, horarioCierre, status);
      this.#fecha = fecha;
    }
  
    getFecha(): string {
      return this.#fecha;
    }

    setFecha(fecha: string): void {
      this.#fecha = fecha
    }
    static fromJSON(data: any): Evento {
      const evento = new Evento();
      evento.setNombre(data.nombre);
      evento.setDireccion(data.direccion);
      evento.setCategoria(data.categoria);
      evento.setDescripcion(data.descripcion);
      evento.setApertura(data.horarioApertura);
      evento.setCierre(data.horarioCierre);
      evento.setFecha(data.fecha);
      evento.setStatus(data.status);
      
      
      return evento;
  }
  }
  