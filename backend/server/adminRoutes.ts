import { AdminController } from './adminController';
import { Router } from 'express';

const router = Router();

// Ruta para registrar al admin
router.post('/admin/register', AdminController.registerAdmin);

export default router;