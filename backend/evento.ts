import { POI } from './poi';

  export class Evento extends POI {
    #fecha: string;
  
    constructor(
      nombre: string = '',
      ubicacion: string = '',
      categoria: string = '',
      descripcion: string = '',
      horarioApertura: string = '',
      horarioCierre: string = '',
      imagenes: string[] = [],
      fecha: string = '',
      status: string = 'pending', 
      
      
    ) {
      super(nombre, ubicacion, categoria, descripcion, horarioApertura, horarioCierre, imagenes, status);
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
      evento.setUbicacion(data.ubicacion);
      evento.setCategoria(data.categoria);
      evento.setDescripcion(data.descripcion);
      evento.setApertura(data.horarioApertura);
      evento.setCierre(data.horarioCierre);
      if (data.imagenes) evento.setImagenes(data.imagenes); 
      evento.setFecha(data.fecha);
      evento.setStatus(data.status);
      
      
      return evento;
  }
  }
  