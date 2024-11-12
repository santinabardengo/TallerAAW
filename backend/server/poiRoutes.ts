// routes/poiRoutes.ts
import { Router } from 'express';
import { POIController } from './poiController';
import multer  from 'multer'
import fs from 'fs';


const router = Router();
const images = multer({ dest: "images/" });


// Ruta para obtener POIs pendientes
router.get('/pending', POIController.getPendingPOIs);

// Ruta para obtener POIs aprobados
router.get('/approved', POIController.getApprovedPOIs);

// Ruta para crear un nuevo POI
router.post('/', images.array("images"),POIController.createPOI);

// Ruta para aprobar un POI
router.post('/:nombre/approve', POIController.approvePOI);

// Ruta para rechazar un POI
router.post('/:nombre/reject', POIController.rejectPOI);

// Route to search POIs
// router.get('/search', (req, res) => {
//     const searchTerm = String(req.query.term).toLowerCase();
    
//     // Read POIs from the JSON file
//     fs.readFile('../../pois.json', 'utf8', (err, data) => {
//       if (err) return res.status(500).send('Error reading data');
  
//       const pois = JSON.parse(data);
//       const filteredPois = pois.filter(poi => poi.name.toLowerCase().includes(searchTerm));
  
//       res.json(filteredPois);
//     });
//   });

export default router;
