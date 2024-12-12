import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject } from 'rxjs';
import { Institucion } from '../instituciones/instituciones.module';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  public database!: SQLiteObject;
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  // Tabla de la base de datos
  tblInstitucion: string = `CREATE TABLE IF NOT EXISTS institucion (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(50) NOT NULL
  )`;

  constructor(private platform: Platform, private sqlite: SQLite) {
    this.crearDB(); // Inicializar DB en el constructor
  }

  // Crear DB
  async crearDB() {
    await this.platform.ready();
    try {
      this.database = await this.sqlite.create({
        name: 'institucion.db',
        location: 'default'
      });
      this.presentToast("Base de datos creada");
      await this.crearTablas();
    } catch (error) {
      this.presentToast("Error al crear la base de datos: " + error);
    }
  }

  // Crear las tablas
  async crearTablas() {
    try {
      await this.database.executeSql(this.tblInstitucion, []);
      this.presentToast("Tabla creada");
      this.isDbReady.next(true); // Notificar que la DB está lista
    } catch (error) {
      this.presentToast("Error al crear la tabla: " + error);
    }
  }

  // Añadir institución
  async addInstitucion(nombre: string): Promise<Institucion[]> {
    const data = [nombre];
    try {
      await this.database.executeSql('INSERT INTO institucion(nombre) VALUES(?)', data);
      return await this.cargarInstitucion(); // Devuelve la lista actualizada de instituciones
    } catch (error) {
      console.error("Error al agregar institución:", error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  }

  // Actualizar institución
  async updateInstitucion(id: number, nombre: string) {
    const data = [nombre, id];
    try {
      await this.database.executeSql('UPDATE institucion SET nombre=? WHERE id=?', data);
    } catch (error) {
      console.error("Error al actualizar institución:", error);
    }
  }

  // Borrar institución
  async deleteInstitucion(id: number) {
    try {
      await this.database.executeSql('DELETE FROM institucion WHERE id=?', [id]);
    } catch (error) {
      console.error("Error al borrar institución:", error);
    }
  }

  // Leer las instituciones
  async cargarInstitucion(): Promise<Institucion[]> {
    const res = await this.database.executeSql('SELECT * FROM institucion', []);
    const items: Institucion[] = [];
    for (let i = 0; i < res.rows.length; i++) {
      items.push({
        id: res.rows.item(i).id,
        nombre: res.rows.item(i).nombre
      });
    }
    return items; // Retorna la lista de instituciones
  }

  private presentToast(message: string) {
    console.log(message); // Aquí podrías usar un toast real en lugar de console.log
  }
}
