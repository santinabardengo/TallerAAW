import { AdminController } from './adminController';
import { Router } from 'express';

const router = Router();

// Ruta para registrar al admin
router.post('/register', AdminController.registerAdmin);

router.get('/datos-admin', AdminController.obtenerAdmin);

export default router;