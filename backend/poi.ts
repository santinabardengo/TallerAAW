export class POI {
    // Propiedades privadas con #
    #nombre: string;
    #ubicacion: string;
    #categoria: string;
    #descripcion: string;
    #horarioApertura: string;
    #horarioCierre: string;
    #status: string;
  
    constructor(
      nombre: string = '',
      ubicacion: string = '',
      categoria: string = '',
      descripcion: string = '',
      horarioApertura: string = '',
      horarioCierre: string = '',
      status: string = 'pending'
    ) {
      this.#nombre = nombre;
      this.#ubicacion = ubicacion;
      this.#categoria = categoria;
      this.#descripcion = descripcion;
      this.#horarioApertura = horarioApertura;
      this.#horarioCierre = horarioCierre;
      this.#status = status;
    }


    //Setters
    setCategoria(categoria: string): void {
      this.#categoria = categoria;
    } 

    setNombre(nombre: string): void {
      this.#nombre = nombre;
    } 

    setUbicacion(ubicacion: string): void {
      this.#ubicacion = ubicacion;
    } 

    setDescripcion(descripcion: string): void {
      this.#descripcion = descripcion;
    } 

    setApertura(horarioApertura: string): void {
      this.#horarioApertura = horarioApertura;
    } 

    setCierre(horarioCierre: string): void {
      this.#horarioCierre = horarioCierre;
    } 

    setStatus(status: string): void {
      this.#status = status;
    } 

    static fromJSON(data: any): POI {
      const poi = new POI();
      poi.setNombre(data.nombre);
      poi.setUbicacion(data.ubicacion);
      poi.setCategoria(data.categoria);
      poi.setDescripcion(data.descripcion);
      poi.setApertura(data.horarioApertura);
      poi.setCierre(data.horarioCierre);
      poi.setStatus(data.status);
      return poi;
  }
  
    // Getters
    getNombre(): string {
      return this.#nombre;
    }
  
    getDireccion(): string {
      return this.#ubicacion;
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
  
