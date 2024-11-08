import { Request, Response } from 'express';
import { GestorDataUsuarios } from '../gestordatausuarios';


const usuarios = new GestorDataUsuarios();

export class AdminController {

    static registerAdmin(req: Request, res: Response) {
        const { email, pin } = req.body;
        // Verificar si ya existe un administrador
        const data = usuarios.getAdminData('usuarios.json');

        if (!data){
        // Guardar el nuevo administrador
        data.admin = { email, pin };
        usuarios.saveAdminData('usuarios.json',data);
        res.status(201).json({ message: 'Administrador registrado exitosamente' });
        }
    }

    static obtenerAdmin(req: Request, res: Response) {
        const data = usuarios.getAdminData('usuarios.json');
        if (data) {
            res.status(200).json(data);
          } else {
            // Si no hay datos, enviamos una respuesta 404 indicando que no se encontró
            res.status(404).json({ message: 'Datos de administrador no encontrados' });
          }
    }
}