import fs from 'fs';
import path from 'path';


export class GestorDataUsuarios {
  
  getAdminData(ruta: string): any {
    try {
      const data = fs.readFileSync(ruta, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return {};
    }
  }

  saveAdminData(ruta: string, data: any): void {
    try {
      fs.writeFileSync("us", JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error al guardar los datos del administrador:', error);
    }
  }
}
