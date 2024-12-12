import { Component } from '@angular/core';
import { SelectionService } from '../services/selection.service';
import { Router } from '@angular/router';
import { InstitucionService } from '../services/institucion.service';

@Component({
  selector: 'app-encuesta-docente',
  templateUrl: './encuesta-docente.page.html',
  styleUrls: ['./encuesta-docente.page.scss'],
})
export class EncuestaDocentePage {
  selectedCourse: string = ''; // Inicializa la variable
  institucionSeleccionada: string = '';
  iniReporte: string = " ";

  //VARIABLE QUE DEFINIRA SI SE MUESTRA UN ITEM
  visibilidadItems: boolean = false;

  constructor(
    private institucionService: InstitucionService,
    private selectionService: SelectionService,
    private router: Router
  ) { }
  
  ngOnInit() {
    // Obtiene la institución seleccionada del servicio
    this.institucionSeleccionada = this.institucionService.obtenerInstitucionSeleccionada();
    console.log('Institución seleccionada en EncuestaDocentePage:', this.institucionSeleccionada);
  }
  
  // Método para manejar el cambio de selección
  onCourseChange(event: any) {
    this.selectedCourse = event.detail.value; // Actualiza la variable con el valor seleccionado
    this.selectionService.setSelectedCourse(this.selectedCourse); // Establece el curso en el servicio
  }
  selectedGroup: string = '';

  onGroupChange(event: any) {
    this.selectedGroup = event.detail.value; // Actualiza la variable con el grupo seleccionado
  }
  // Método para evaluar
  evaluate() {
    console.log('Curso seleccionado para evaluar:', this.selectedCourse);
    this.mostrarItem();
    //MOSTRARA EL SELECTOR DE GRUPO
  }

  mostrarItem() {
    this.visibilidadItems = !this.visibilidadItems; // Cambia el valor de visibilidadItem
  }

  // Método para comenzar la evaluación
  comenzarEvaluacion() {
    console.log('Grupo seleccionado para evaluar:', this.selectedGroup);
    this.router.navigate(['./encuestas-grupo']);
  }
}