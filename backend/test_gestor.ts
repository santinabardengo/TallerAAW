import { GestorDePOIs } from './gestorpoi'; // Asegúrate de que la ruta sea correcta

// Definir la interfaz para los datos del POI
interface POIData {
  nombre: string;
  direccion: string;
  categoria: string;
  descripcion: string;
  horarioApertura: string;
  horarioCierre: string;
  status: string;
}

// Crear una instancia del GestorDePOIs
const gestor = new GestorDePOIs();

// Crear un POI de prueba
const datosPOI: POIData = {
  nombre: "Museo de Neuquén",
  direccion: "Calle Falsa 123",
  categoria: "Lugar",
  descripcion: "Un lugar cultural en Neuquén.",
  horarioApertura: "09:00",
  horarioCierre: "18:00",
  status: "pending"
};

// Crear el POI
gestor.crearPOI(datosPOI);

// Verificar que el POI se agregó al JSON
console.log(gestor.getPOIs());
