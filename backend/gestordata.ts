import fs from 'fs';
import { POI } from './poi';
import { Evento } from './evento';

export class GestorBaseDeDatos {

// leer archivo JSON y devolver un arreglo de POIs o Eventos
  leerArchivo(ruta: string): (POI | Evento)[] | null {
    try {
        const data = fs.readFileSync(ruta, 'utf-8');
        const poisLeidos = JSON.parse(data);
        const pois = poisLeidos.map((poiData: any) => {
            return poiData.categoria === 'Evento'
                ? Evento.fromJSON(poiData)
                : POI.fromJSON(poiData); //PREGUNTAR
        });
        
        return pois;
        
    } catch (error) {
        console.error('Error al leer el archivo:', error);
        return null;
    }
}

//Dado un POI, escribilo en el archivo
guardarPoiArchivo(ruta: string, poi: POI | Evento): void {
    try {
        let poisLeidos: any[] = [];
        try {
            const data = fs.readFileSync(ruta, 'utf-8');
            if (data.trim() !== '') {
                poisLeidos = JSON.parse(data); // Parsear el JSON si el archivo no está vacío
            }
        } catch (error) {
            console.log('Archivo no encontrado o vacío, inicializando un nuevo arreglo.');
        }
        const poiData = {
            nombre: poi.getNombre(),
            direccion: poi.getDireccion(),
            categoria: poi.getCategoria(),
            descripcion: poi.getDescripcion(),
            horarioApertura: poi.getHorarioApertura(),
            horarioCierre: poi.getHorarioCierre(),
            status: poi.getStatus(),
            ...(poi instanceof Evento && { fecha: poi.getFecha() })  // Solo agregar fecha si es un Evento
        };

        poisLeidos.push(poiData);

        // Escribir el arreglo actualizado en el archivo
        fs.writeFileSync(ruta, JSON.stringify(poisLeidos, null, 2), 'utf-8');

    } catch (error) {
        console.error('Error al guardar los POIs en el archivo:', error);
    }
}


iniciarBD(ruta: string): void {
    try {
        const listaVacia: any[] = [];
        fs.writeFileSync(ruta, JSON.stringify(listaVacia, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error al crear el archivo JSON:', error);
    }
}

}
