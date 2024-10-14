export class POI {
    // Propiedades privadas con #
    #nombre: string;
    #direccion: string;
    #categoria: string;
    #descripcion: string;
    #horarioApertura: string;
    #horarioCierre: string;
    #status: string;
  
    constructor(
      nombre: string,
      direccion: string,
      categoria: string,
      descripcion: string,
      horarioApertura: string,
      horarioCierre: string,
      status: string
    ) {
      this.#nombre = nombre;
      this.#direccion = direccion;
      this.#categoria = categoria;
      this.#descripcion = descripcion;
      this.#horarioApertura = horarioApertura;
      this.#horarioCierre = horarioCierre;
      this.#status = status;
    }
  
    // Getters
    getNombre(): string {
      return this.#nombre;
    }
  
    getDireccion(): string {
      return this.#direccion;
    }
  
    getCategoria(): string {
      return this.#categoria;
    }
  
    getDescripcion(): string {
      return this.#descripcion;
    }
  
    getHorarioApertura(): string {
      return this.#horarioApertura;
    }
  
    getHorarioCierre(): string {
      return this.#horarioCierre;
    }

    getStatus(): string {
      return this.#status;
    }
  
  }
  
