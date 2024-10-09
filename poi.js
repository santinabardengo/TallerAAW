
// metodo privado --> #

class POI {
    #nombre;
    #direccion;
    #categoria;
    #descripcion;
    #imagen;
    #horarioApertura;
    #horarioCierre;

    constructor(nombre, direccion, categoria, descripcion, imagen, horarioApertura, horarioCierre) {
        this.#nombre = nombre;
        this.#direccion = direccion;
        this.#categoria = categoria;
        this.#descripcion = descripcion;
        this.#imagen = imagen;
        this.#horarioApertura = horarioApertura;
        this.#horarioCierre = horarioCierre;
    }

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

    getImagen() {
        return this.#imagen;
    }

    getHorarioApertura() {
        return this.#horarioApertura;
    }

    getHorarioCierre() {
        return this.#horarioCierre;
    }

    // Método de validación, el usuario tiene que incluir estos campos para crear un POI
    validate() {
        if (!this.#nombre || !this.#direccion || !this.#categoria) {
        throw new Error('Faltan campos obligatorios en el POI.');
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

