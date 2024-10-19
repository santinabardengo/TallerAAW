import express, { Request, Response, Express } from 'express'; 
import { GestorDePOIs } from './gestorpoi';
import { Admin } from './admin';
import bodyParser from 'body-parser';
import cors from 'cors';

const app: Express = express(); 
app.use(cors({
  origin: 'http://localhost:4200',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const port = 3000; 

app.use(bodyParser.json());

const gestor = new GestorDePOIs();
const admin = new Admin(gestor);


// obtener POIs pendienes
app.get('/points-of-interest/pending', (req: Request, res: Response) => {
  const pendingPOIs = gestor.getPendingPOIs();
  const poiNames = pendingPOIs.map(poi => poi.getNombre()); 
  res.json(poiNames); 
});

//crear POI
app.post('/points-of-interest', (req: Request, res: Response) => {
  const datosPOI = req.body;
  try {
    gestor.crearPOI(datosPOI);
    res.status(201).json({ message: 'POI creado con éxito' });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
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
