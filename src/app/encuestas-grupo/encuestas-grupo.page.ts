import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { SelectionService } from '../services/selection.service';

@Component({
  selector: 'app-encuestas-grupo',
  templateUrl: './encuestas-grupo.page.html',
  styleUrls: ['./encuestas-grupo.page.scss'],
})
export class EncuestasGrupoPage implements OnInit {
  surveyForm!: FormGroup; // Declaración con aserción no nula

  selectedCourse: String = "";

  constructor(
    private fb: FormBuilder,
    private selectionService: SelectionService 
  ) {}

  ngOnInit() {
    this.selectedCourse = this.selectionService.getSelectedCourse();

    this.surveyForm = this.fb.group({
      questions: this.fb.array([]), // Un array vacío al inicio
    });
    this.addQuestion(); // Añadir la primera pregunta por defecto
  }

  questions(): FormArray {
    return this.surveyForm.get('questions') as FormArray;
  }

  addQuestion() {
    const questionForm = this.fb.group({
      questionText: ['', Validators.required], // Cambiado a questionText
      option: ['', Validators.required],
    });
    this.questions().push(questionForm);
  }

  removeQuestion(index: number) {
    this.questions().removeAt(index);
  }

  submitSurvey() {
    console.log(this.surveyForm.value);
  }
}
