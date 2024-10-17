import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminPinComponent } from './admin-pin/admin-pin.component';
import { MapComponent } from './map/map.component';
import { UserMapComponent } from './user-map/user-map.component';
import { AdminComponent } from './admin/admin.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent},
  { path: 'admin-pin', component: AdminPinComponent },
  { path: 'map', component: MapComponent},
  { path: 'user-map', component: UserMapComponent },
 

];
