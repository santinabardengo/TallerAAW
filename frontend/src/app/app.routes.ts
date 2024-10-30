import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminPinComponent } from './admin-pin/admin-pin.component';
import { MapComponent } from './map/map.component';
import { UserMapComponent } from './user-map/user-map.component';
import { AdminComponent } from './admin/admin.component';
import { FormularioComponent } from './formulario/formulario.component';
import { MapaFormularioComponent } from './mapa-formulario/mapa-formulario.component';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [adminGuard]},
  { path: 'admin-pin', component: AdminPinComponent },
  { path: 'map', component: MapComponent},
  { path: 'user-map', component: UserMapComponent },
  { path: 'formulario', component: FormularioComponent},
  { path: 'mapa-formulario', component: MapaFormularioComponent}

];
