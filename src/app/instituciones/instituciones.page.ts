import { Component } from '@angular/core';
import { InstitucionService } from '../services/institucion.service';
import { Router } from '@angular/router';
import { SqliteService } from '../services/db-sqlite.service';
import { Institucion } from '../instituciones/instituciones.module'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-instituciones',
  templateUrl: './instituciones.page.html',
  styleUrls: ['./instituciones.page.scss'],
})
export class InstitucionesPage {
  instituciones: Institucion[] = []; // Almacenará las instituciones
  nuevoNombre: string = ''; // Almacenará el nombre nuevo

  constructor(
    private institucionService: InstitucionService,
    private router: Router,
    private sqliteService: SqliteService
  ) {}

  seleccionarInstitucion(nombreInstitucion: string) {
    console.log('Seleccionando institución:', nombreInstitucion);
    this.institucionService.seleccionarInstitucion(nombreInstitucion);
    console.log('Institución guardada en el servicio:', this.institucionService.obtenerInstitucionSeleccionada());
    this.router.navigate(['/encuesta-docente']);
  }

  ngOnInit() {
    this.loadInstituciones();
  }
    
  loadInstituciones() {
    this.sqliteService.cargarInstitucion()
      .then(data => {
        this.instituciones = data; // Asigna los datos cargados al arreglo
      })
      .catch(error => {
        console.error("Error al cargar instituciones:", error);
      });
  }

  async addInstitucion() {
    if (this.nuevoNombre.trim()) {
      try {
        // Añadir institución y actualizar la lista
        await this.sqliteService.addInstitucion(this.nuevoNombre);
        this.instituciones = await this.sqliteService.cargarInstitucion(); // Cargar la lista actualizada
        this.nuevoNombre = ''; // Limpiar el campo de entrada
      } catch (error) {
        console.error("Error al añadir institución:", error);
      }
    } else {
      console.warn("El nombre no puede estar vacío");
    }
  }
}
