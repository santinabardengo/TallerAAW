// routes/poiRoutes.ts
import { Router } from 'express';
import { POIController } from './poiController';
import multer  from 'multer'

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

export default router;
