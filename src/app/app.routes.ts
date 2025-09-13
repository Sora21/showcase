import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MeshComponent } from './pages/mesh/mesh.component';
import { authGuards } from './utils/can-activate-guard';

export const DEFAULT_SUB_HEADING = 'Test anim';

export const routes: Routes = [
    { path: '', title: 'Home', component: HomeComponent, data: { subHeading: DEFAULT_SUB_HEADING, heading: 'Showcase' }, canActivate: authGuards },
    { path: 'meshes', title: 'Meshes', component: MeshComponent, data: { heading: 'Mesh Tests' }, canActivate: authGuards },


    { path: '**', redirectTo: '', canActivate: authGuards },
];
