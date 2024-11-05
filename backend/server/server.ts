// server.ts
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import poiRoutes from './poiRoutes';

const app: Express = express();
const port = 3000;

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para parsear JSON
app.use(bodyParser.json());

// Rutas para puntos de interés
app.use('/points-of-interest', poiRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
