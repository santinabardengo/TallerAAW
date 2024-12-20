// server.ts
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import poiRoutes from './poiRoutes';
import adminRoutes from './adminRoutes';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: Express = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para parsear JSON
app.use(bodyParser.json());

app.use('/points-of-interest', poiRoutes);
app.use('/admin', adminRoutes); 
app.use('/images', express.static(path.join(__dirname, '../images')));

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at http://localhost:${port}`);
});

