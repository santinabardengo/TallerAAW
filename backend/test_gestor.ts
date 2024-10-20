import { GestorBaseDeDatos } from './gestordata';
import { GestorDePOIs } from './gestorpoi'; // Asegúrate de que la ruta sea correcta
import { Admin } from './admin';
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
const admin = new Admin(gestor);

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
  nombre: "Parque Nacional Lanín",
  direccion: "Ruta Provincial 61, San Martín de los Andes",
  categoria: "Lugar",
  descripcion: "Un parque nacional con paisajes de montañas, lagos y bosques, ideal para senderismo y actividades al aire libre.",
  horarioApertura: "08:00",
  horarioCierre: "19:00",
  status : "pending"
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

admin.aprobarPOI("Parque Nacional Lanín")
