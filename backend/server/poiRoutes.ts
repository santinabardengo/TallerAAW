// routes/poiRoutes.ts
import { Router } from 'express';
import { POIController } from './poiController';
import multer  from 'multer'
import fs from 'fs';


const router = Router();
const images = multer({ dest: "images/" });



router.get('/pending', POIController.getPendingPOIs);

router.get('/approved', POIController.getApprovedPOIs);

router.post('/', images.array("images"),POIController.createPOI);

router.post('/:nombre/approve', POIController.approvePOI);

router.post('/:nombre/reject', POIController.rejectPOI);


export default router;
