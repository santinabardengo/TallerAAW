const POI = require('./poi');

  export class Evento extends POI {
    #fecha: string;
  
    constructor(
      nombre: string,
      direccion: string,
      categoria: string,
      descripcion: string,
      horarioApertura: string,
      horarioCierre: string,
      status: string,
      fecha: string
    ) {
      super(nombre, direccion, categoria, descripcion, horarioApertura, horarioCierre, status);
      this.#fecha = fecha;
    }
  
    getFecha(): string {
      return this.#fecha;
    }
  }
  