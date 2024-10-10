
// metodo privado --> #

class POI {
    #nombre;
    #direccion;
    #categoria;
    #descripcion;
    #horarioApertura;
    #horarioCierre;

    constructor(nombre, direccion, categoria, descripcion, imagen, horarioApertura, horarioCierre) {
        this.#nombre = nombre;
        this.#direccion = direccion;
        this.#categoria = categoria;
        this.#descripcion = descripcion;
        this.#horarioApertura = horarioApertura;
        this.#horarioCierre = horarioCierre;
    }

    //falta imagen 

    // Getters
    getNombre() {
        return this.#nombre;
    }

    getDireccion() {
        return this.#direccion;
    }   

    getCategoria() {
        return this.#categoria;
    }

    getDescripcion() {
        return this.#descripcion;
    }

    getHorarioApertura() {
        return this.#horarioApertura;
    }

    getHorarioCierre() {
        return this.#horarioCierre;
    }

    //Método de validación
    validate() {
        if (!this.#nombre || !this.#direccion || !this.#categoria) {
        throw new Error('Faltan campos obligatorios en el POI.');
        }

        //el horario de apertura y cierre sean fechas válidas
        if (isNaN(Date.parse(this.#horarioApertura)) || isNaN(Date.parse(this.#horarioCierre))) {
        throw new Error("Las fechas de apertura o cierre no son válidas.");
        }
  
        //la hora de apertura sea anterior a la de cierre
        if (new Date(this.#horarioApertura) >= new Date(this.#horarioCierre)) {
        throw new Error("El horario de apertura debe ser anterior al de cierre.");
        }

        if(this.categoria.toLowerCase() != 'lugar' || this.categoria != 'evento') {
            throw new Error("La categoría no es válida");
        }
    
    }
}

// Subclase Evento que hereda de POI
class Evento extends POI {
    #fecha;

    constructor(nombre, direccion, categoria, descripcion, imagen, horarioApertura, horarioCierre, fecha) {
        super(nombre, direccion, categoria, descripcion, imagen, horarioApertura, horarioCierre); // llamar al constructor de POI
        this.#fecha = fecha;
    }

    getFecha() {
        return this.#fecha;
    }

    validate() {
        super.validate(); 
        if (!this.#fecha) {
            throw new Error('El campo "fecha" es obligatorio para un evento.');
        }
    }
}


//sacamos lugar pq era basicamente un POI 

// Exportar las clases
module.exports = { POI, Evento};

