import { GestorDePOIs } from './gestorpoi.ts'; // Importamos la clase GestorDePOIs

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
  nombre: "Cerro Chapelco",
  direccion: "Calle Falsa 434",
  categoria: "Lugar",
  descripcion: "Un lugar cultural en Neuquén.",
  horarioApertura: "09:00",
  horarioCierre: "18:00",
  status: "pending"
};

const datosPOI2: POIData = {
  nombre: "Lago Lolog",
  direccion: "Calle 434",
  categoria: "Lugar",
  descripcion: "Un lago en Neuquén.",
  horarioApertura: "09:00",
  horarioCierre: "18:00",
  status: "pending"
};

// Crear el POI
gestor.crearPOI(datosPOI);
gestor.crearPOI(datosPOI2);

gestor.leerArchivo("pois.json")

// Verificar que el POI se agregó al JSON
console.log(gestor.getPOIs());
