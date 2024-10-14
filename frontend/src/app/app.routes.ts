import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserMapComponent } from './user-map/user-map.component';
import { AdminPinComponent } from './admin-pin/admin-pin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'user-map', component: UserMapComponent },
  { path: 'admin', component: AdminDashboardComponent},
  { path: 'admin-pin', component: AdminPinComponent },
];
