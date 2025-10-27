import { Routes } from '@angular/router';

import { IndexComponent } from './pages/index/index';
import { PacientesComponent } from './pages/pacientes/pacientes';
import { MedicosComponent } from './pages/medicos/medicos';
import { CitasComponent } from './pages/citas/citas';

export const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'pacientes', component: PacientesComponent },
    { path: 'medicos', component: MedicosComponent },
    { path: 'citas', component: CitasComponent },
];