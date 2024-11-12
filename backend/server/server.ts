// server.ts
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import poiRoutes from './poiRoutes';
import adminRoutes from './adminRoutes';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();
const port = process.env.PORT || 3000;
const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:4200'

// Configuración de CORS
app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para parsear JSON
app.use(bodyParser.json());

// Rutas para puntos de interés
app.use('/points-of-interest', poiRoutes);
// Rutas para administrador
app.use('/admin', adminRoutes); 
app.use('/images', express.static(path.join(__dirname, '../images')));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running at ${allowedOrigin}:${port}`);
});

