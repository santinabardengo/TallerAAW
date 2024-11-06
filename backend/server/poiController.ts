// controllers/poiController.ts
import { Request, Response } from 'express';
import { GestorDePOIs } from '../gestorpoi';
import { Evento } from '../evento';
import { Admin } from '../admin';
import fs from "fs"

const gestor = new GestorDePOIs();
const admin = new Admin(gestor);

export class POIController {
  static getPendingPOIs(req: Request, res: Response) {
    const pendingPOIs = gestor.getPendingPOIs();
    const poiData = pendingPOIs.map(poi => ({
      nombre: poi.getNombre(),
      descripcion: poi.getDescripcion(),
      ubicacion: poi.getUbicacion(),
      horarioApertura: poi.getHorarioApertura(),
      horarioCierre: poi.getHorarioCierre(),
      imagenes: poi.getImagenes(),
      ...(poi instanceof Evento ? { fecha: poi.getFecha() } : {})
    }));

    res.json(poiData);
  }

  static getApprovedPOIs(req: Request, res: Response) {
    const approvedPOIs = gestor.getApprovedPOIs();
    const poiData = approvedPOIs.map(poi => ({
      nombre: poi.getNombre(),
      descripcion: poi.getDescripcion(),
      ubicacion: poi.getUbicacion(),
      horarioApertura: poi.getHorarioApertura(),
      horarioCierre: poi.getHorarioCierre(),
      imagenes: poi.getImagenes(),
      ...(poi instanceof Evento ? { fecha: poi.getFecha() } : {})
    }));

    res.json(poiData);
  }

  static createPOI(req: Request, res: Response) {

    const imagenesGuardadas: string[] = [];

    if (req.files && Array.isArray(req.files)) {
      req.files.forEach((file: any) => {
        const rutaImagen = POIController.saveImage(file);
        imagenesGuardadas.push(rutaImagen);
      });
    } 
    // Agregar las rutas de las imágenes al objeto datosPOI
    const datosPOI = {
      ...req.body, 
      imagenes: imagenesGuardadas, 
    };

    console.log(datosPOI)

    try {
      gestor.crearPOI(datosPOI);
      res.status(201).json({ message: 'POI creado con éxito' });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  static saveImage(file){
    const newPath = `./images/${file.originalname}`;
    fs.renameSync(file.path, newPath);
    return newPath
  }

  static approvePOI(req: Request, res: Response) {
    const nombre = req.params.nombre;
    const resultado = admin.aprobarPOI(nombre);

    if (resultado) {
      res.json({ message: `POI ${nombre} aprobado` });
    } else {
      res.status(404).json({ message: `POI ${nombre} no encontrado` });
    }
  }

  static rejectPOI(req: Request, res: Response) {
    const nombre = req.params.nombre;
    const resultado = admin.rechazarPOI(nombre);

    if (resultado) {
      res.json({ message: `POI ${nombre} rechazado` });
    } else {
      res.status(404).json({ message: `POI ${nombre} no encontrado` });
    }
  }
}
