import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { Pregunta1Component } from './pages/pregunta1/pregunta1.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { Pregunta2Component } from './pages/pregunta2/pregunta2.component';

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
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'productos',
    component: ProductosComponent
  },
  {
    path: 'pregunta2',
    component: Pregunta2Component
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  }
];
