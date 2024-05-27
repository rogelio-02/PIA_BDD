import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { HomeComponent } from './home/home.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { CrearEventoComponent } from './crear-evento/crear-evento.component';
import { CartaEventoComponent } from './carta-evento/carta-evento.component';
import { RegistroEventoComponent } from './registro-evento/registro-evento.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'iniciar-sesion',
    component: IniciarSesionComponent
  },
  {
    path: 'crear-usuario',
    component: CrearUsuarioComponent
  },
  {
    path: 'crear-evento',
    component: CrearEventoComponent
  },
  {
    path: 'carta-evento/:id',
    component: CartaEventoComponent
  },
  {
    path: 'registro-evento/:id',
    component: RegistroEventoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
