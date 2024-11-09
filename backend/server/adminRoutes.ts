import { AdminController } from './adminController';
import { Router } from 'express';

const router = Router();

// Ruta para registrar al admin
router.post('/register', AdminController.registerAdmin);

export default router;