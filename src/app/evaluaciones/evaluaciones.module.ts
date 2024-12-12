import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvaluacionesPageRoutingModule } from './evaluaciones-routing.module';

import { EvaluacionesPage } from './evaluaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvaluacionesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EvaluacionesPage]
})
export class EvaluacionesPageModule {
}
