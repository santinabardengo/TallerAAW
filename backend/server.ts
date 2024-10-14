import express, { Request, Response, Express } from 'express'; // Importamos Express y tipos
import { GestorDePOIs } from './gestorpoi';
import { Admin } from './admin';
import { POI } from './poi';
import { Evento } from './evento';
import bodyParser from 'body-parser';

const app: Express = express(); // Creamos la aplicación Express
const port = 3000; // Definimos el puerto

app.use(bodyParser.json());

const gestor = new GestorDePOIs();
const admin = new Admin(gestor);

// obtener POIs
app.get('/points-of-interest', (req: Request, res: Response) => {
  res.json(gestor.getPOIs());
});

//crear POI
app.post('/points-of-interest', (req: Request, res: Response) => {
  const datosPOI = req.body;
  try {
    gestor.crearPOI(datosPOI);
    res.status(201).json({ message: 'POI creado con éxito' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// aprobar POI
app.post('/points-of-interest/:nombre/approve', (req: Request, res: Response) => {
  const nombre = req.params.nombre;
  const resultado = admin.aprobarPOI(nombre);

  if (resultado) {
    res.json({ message: `POI ${nombre} aprobado` });
  } else {
    res.status(404).json({ message: `POI ${nombre} no encontrado` });
  }
});

// rechazar POI
app.post('/points-of-interest/:nombre/reject', (req: Request, res: Response) => {
  const nombre = req.params.nombre;
  const resultado = admin.rechazarPOI(nombre);

  if (resultado) {
    res.json({ message: `POI ${nombre} rechazado` });
  } else {
    res.status(404).json({ message: `POI ${nombre} no encontrado` });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
