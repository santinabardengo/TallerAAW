import fs from 'fs';
import { POI } from './poi';
import { Evento } from './evento';

export class GestorBaseDeDatos {

  // leer archivo JSON y devolver un arreglo de POIs o Eventos
leerArchivo(ruta: string): (POI | Evento)[] | null {
    try {
        const data = fs.readFileSync(ruta, 'utf-8');
        const poisLeidos = JSON.parse(data);

      // Convertir los objetos leídos en instancias de POI o Evento
    return poisLeidos.map((poiData: any) => {
        if (poiData.categoria === 'Evento') {
            return new Evento(
                poiData.nombre,
                poiData.direccion,
                poiData.categoria,
                poiData.descripcion,
                poiData.horarioApertura,
                poiData.horarioCierre,
                poiData.status,
                poiData.fecha
        );
        } else {
        return new POI(
            poiData.nombre,
            poiData.direccion,
            poiData.categoria,
            poiData.descripcion,
            poiData.horarioApertura,
            poiData.horarioCierre,
            poiData.status
        );
        }
    });
    } catch (error) {
        console.error('Error al leer el archivo:', error);
        return null;
    }
}

  //guardar POIs o Eventos en un archivo JSON
guardarArchivo(ruta: string, pois: (POI | Evento)[]): void {
    try {
        const data = pois.map(poi => ({
            nombre: poi.getNombre(),
            direccion: poi.getDireccion(),
            categoria: poi.getCategoria(),
            descripcion: poi.getDescripcion(),
            horarioApertura: poi.getHorarioApertura(),
            horarioCierre: poi.getHorarioCierre(),
            status: poi.getStatus(),
            ...(poi instanceof Evento && { fecha: poi.getFecha() })  // Solo agregar fecha si es un Evento
    }));

    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(ruta, jsonData, 'utf-8');
    console.log('Archivo guardado correctamente en', ruta);
    } catch (error) {
        console.error('Error al guardar los POIs en el archivo:', error);
    }
}
}
