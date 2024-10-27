import fs from 'fs';
import { POI } from './poi';
import { Evento } from './evento';

export class GestorBaseDeDatos {

// leer archivo JSON y devolver un arreglo de POIs o Eventos
  leerArchivo(ruta: string): (POI | Evento)[] | null {
    try {
        const data = fs.readFileSync(ruta, 'utf-8');
        if (!data.trim()) {
          return []; 
        }
        const poisLeidos = JSON.parse(data);
        const pois = poisLeidos.map((poiData: any) => {
            return poiData.categoria === 'evento'
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
  
      // Leer el contenido del archivo, si existe
      try {
        const data = fs.readFileSync(ruta, 'utf-8');
        if (data.trim() !== '') {
          poisLeidos = JSON.parse(data);
        }
      } catch (error) {
        console.log('Archivo no encontrado o vacío, inicializando un nuevo arreglo.');
      }
  
      // Crear el objeto POI a guardar
      const poiData = {
        nombre: poi.getNombre(),
        ubicacion: poi.getUbicacion(),
        categoria: poi.getCategoria(),
        descripcion: poi.getDescripcion(),
        horarioApertura: poi.getHorarioApertura(),
        horarioCierre: poi.getHorarioCierre(),
        ...(poi instanceof Evento && { fecha: poi.getFecha() }),
        status: poi.getStatus(),
        
      };
  
      // Buscar el índice del POI existente en el arreglo
      const index = poisLeidos.findIndex((p) => p.nombre === poi.getNombre());
  
      if (index !== -1) {
        // Si el POI existe, actualizarlo
        poisLeidos[index] = poiData;
      } else {
        // Si no existe, agregarlo al final del arreglo
        poisLeidos.push(poiData);
      }
  
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
