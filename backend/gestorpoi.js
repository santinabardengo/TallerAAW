const POI = require('./poi');

class GestorDePOIs {
  constructor() {
    this.listaDePOIs = [];
  }
  // Crear un nuevo POI
  crearPOI(datosPOI) {
    const { nombre, direccion, categoria, descripcion, horarioApertura, horarioCierre } = datosPOI;
    const nuevoPOI = new POI(nombre, direccion, categoria, descripcion, horarioApertura, horarioCierre);
    
    nuevoPOI.validate(); // Validar los datos

    this.listaDePOIs.push(nuevoPOI);
  }
}

module.exports = GestorDePOIs;
