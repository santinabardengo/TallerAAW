// importar clase
const { POI } = require('./poi');

// Crear una nueva instancia de POI
const museo = new POI("Museo", "Calle 123", "Cultura", "Un museo local", "museo.png", "09:00", "18:00");

console.log(museo.getNombre());  // "Museo"