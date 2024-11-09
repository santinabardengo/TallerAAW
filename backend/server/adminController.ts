import { Request, Response } from 'express';
import { GestorDataUsuarios } from '../gestordatausuarios';


const usuarios = new GestorDataUsuarios();

export class AdminController {

    static registerAdmin(req: Request, res: Response) {
        const { email, pin } = req.body;
        // Verificar si ya existe un administrador
        const data = usuarios.getAdminData('usuarios.json');
        if (data === null){
        data.admin = { email, pin };
        usuarios.saveAdminData('usuarios.json',data);
        res.status(201).json({ message: 'Administrador registrado exitosamente' });
        }else {
          res.status(409).json({ message: 'Administrador ya registrado' });
      }
    }

    static obtenerAdmin(req: Request, res: Response): any{
        const data = usuarios.getAdminData('usuarios.json');
        if (data) {
            res.status(200).json(data);
            return data;
          } else {
            res.status(404).json({ message: 'Datos de administrador no encontrados' });
            return null;
          }
    }
}