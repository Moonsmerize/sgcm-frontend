import { Routes } from '@angular/router';

// Importa los componentes de las páginas
import { IndexComponent } from './pages/index/index';
import { PacientesComponent } from './pages/pacientes/pacientes';
import { MedicosComponent } from './pages/medicos/medicos';
import { CitasComponent } from './pages/citas/citas';

// Define las rutas de la aplicación
export const routes: Routes = [
    // Ruta raíz ('/') mostrará IndexComponent
    { path: '', component: IndexComponent },
    // Ruta '/pacientes' mostrará PacientesComponent
    { path: 'pacientes', component: PacientesComponent },
    // Ruta '/medicos' mostrará MedicosComponent
    { path: 'medicos', component: MedicosComponent },
    // Ruta '/citas' mostrará CitasComponent
    { path: 'citas', component: CitasComponent },

    // Opcional: Una ruta 'catch-all' para redirigir a la página principal si la URL no coincide
    // { path: '**', redirectTo: '', pathMatch: 'full' }
];