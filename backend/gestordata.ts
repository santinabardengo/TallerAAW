import fs from 'fs';

export class GestorBaseDeDatos {

leerArchivo(ruta: string): any {
    try {
        const data = fs.readFileSync(ruta, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
    console.error('Error al leer el archivo:', error);
    return null;
    }
}

guardarArchivo(ruta: string, data: any): void {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFileSync(ruta, jsonData, 'utf-8');
        console.log('Archivo guardado correctamente');
    } catch (error) {
        console.error('Error al guardar el archivo:', error);
        }
    }
}
