import { Routes } from '@angular/router';

// IMPORTAR PAGINAS QUE SE VAN HA UTILIZAR
import { AdminComponent } from './paginas/admin/admin.component';
import { UsuariosComponent } from './paginas/admin/usuarios/usuarios.component';
// import { PanelControlComponent } from './paginas/panel-control/panel-control.component';

import { InicioComponent } from './paginas/inicio/inicio.component';
import { PawsComponent } from './paginas/paws/paws.component';
import { SobreNosotrosComponent } from './paginas/sobre-nosotros/sobre-nosotros.component';
import { ContactanosComponent } from './paginas/contactanos/contactanos.component';
import { AdopcionComponent } from './paginas/adopcion/adopcion.component';
import { BlogComponent } from './paginas/blog/blog.component';

import { LoginComponent } from './paginas/login/login.component';
import { LoginAdminComponent } from './paginas/login-admin/login-admin.component';
import { RegistroComponent } from './paginas/registro/registro.component';
import { RegistroAdminComponent } from './paginas/registro-admin/registro-admin.component';

import { authGuard } from './guards/auth.guard';

import { NotFoundComponent } from './paginas/not-found/not-found.component';
import { GestionAdminComponent } from './components/gestion-admin/gestion-admin.component';
import { DashboardComponent } from './components/dash-board/dash-board.component';

// RUTAS PARA CADA PAGINA
export const routes: Routes = [
  //--------------------------------------------------------------------------------------------------------//
  {
    path: 'admin',
    component: AdminComponent,
    title: 'Admin',
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      { path: 'gestionAdmin', component: GestionAdminComponent, title: 'Gestión de Admin' },
      { path: 'gestionUsuarios', component: UsuariosComponent, title: 'Gestión de Usuarios' },
      { path: '', component: DashboardComponent, title: 'Gestión de Mascotas' }, // Ruta por defecto dentro de /admin
    ],
  },
  //--------------------------------------------------------------------------------------------------------//
  { path: '', component: InicioComponent, title: 'Furry Tails | Inicio' },
  { path: 'paws', component: PawsComponent, title: 'Paws' },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent, title: 'Sobre Nosotros' },
  { path: 'contactanos', component: ContactanosComponent, title: 'Contactanos' },
  { path: 'blog', component: BlogComponent, title: 'Blog' },
  //--------------------------------------------------------------------------------------------------------//
  { path: 'adopcion', component: AdopcionComponent, title: 'Proceso Adopción' }, // Si tenemos tiempo
  { path: 'login', component: LoginComponent, title: 'Furry Tails | Inicio de Sesión' },
  { path: 'loginAdmin', component: LoginAdminComponent, title: 'Furry Tails | Inicio de Sesión Admin' },
  { path: 'registro', component: RegistroComponent, title: 'Furry Tails | Registro' },
  { path: 'registroAdmin', component: RegistroAdminComponent, title: 'Furry Tails | Registro Admin' },
  //--------------------------------------------------------------------------------------------------------//
  { path: '**', component: NotFoundComponent, title: 'Error 404' }, // Ruta para páginas no encontradas
];