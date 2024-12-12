import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private plataforma: Platform) {
    this.iniciarApp();
  }

  //AL INICIAR LA APP
  iniciarApp(){
    this.plataforma.ready().then(() => {
      //FORZAR TEMA BLANCO
      document.body.setAttribute('data-theme', 'light')
    })
  }
}

