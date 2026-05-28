import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { Pregunta1Component } from './pages/pregunta1/pregunta1.component';

export const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'pregunta1',
    component: Pregunta1Component
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  }
];
