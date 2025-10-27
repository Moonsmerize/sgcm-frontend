import { Component } from '@angular/core';
// CommonModule podría no ser necesario si no usas *ngIf, *ngFor, etc. aquí.
// import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    // CommonModule 
    ], // Probablemente vacío o solo CommonModule si lo necesitas
  templateUrl: './index.html',
  // styleUrls: ['./index.component.css'] // Puedes quitar esto si no tienes estilos específicos
})
export class IndexComponent {
  // No necesitas lógica aquí por ahora si el contenido es estático
}