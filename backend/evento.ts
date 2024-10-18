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
      status: string = 'pending',
      fecha: string = ''
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
      evento.setStatus(data.status);
      evento.setFecha(data.fecha);
      return evento;
  }
  }
  