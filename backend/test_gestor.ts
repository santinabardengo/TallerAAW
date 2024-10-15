import { GestorDePOIs } from './gestorpoi';

const gestor = new GestorDePOIs();

// Crear un POI de prueba
const datosPOI = {
  nombre: "Museo de Neuquén",
  direccion: "Calle Falsa 123",
  categoria: "Lugar",
  descripcion: "Un lugar cultural en Neuquén.",
  horarioApertura: "09:00",
  horarioCierre: "18:00",
  status: "pending"
};

gestor.crearPOI(datosPOI);

// Verificar que el POI se agregó al JSON
console.log(gestor.getPOIs());
