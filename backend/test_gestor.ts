import { GestorBaseDeDatos } from './gestordata';
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
const gestorBD = new GestorBaseDeDatos();
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

const datosPOI2: POIData = {
  nombre: "Museo de Neuquén",
  direccion: "LPM",
  categoria: "Lugar",
  descripcion: "Un lugar cultural en Neuquén.",
  horarioApertura: "09:00",
  horarioCierre: "18:00",
  status: "pending"
};

gestorBD.iniciarBD('pois.json');
// Crear el POI
gestor.crearPOI(datosPOI);
gestor.crearPOI(datosPOI2);

// Verificar que el POI se agregó al JSONlet
let pois = gestor.getPOIs();

for (let poi of pois){
  console.log(poi.getNombre())
}
