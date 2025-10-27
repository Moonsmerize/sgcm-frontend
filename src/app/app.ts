import { Component, signal } from '@angular/core';
// Importa RouterOutlet y RouterLink
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // Asegúrate que sea true
  imports: [
    RouterOutlet, // Añade RouterOutlet aquí
    RouterLink    // Añade RouterLink aquí
    ], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('sgcm-frontend');
}