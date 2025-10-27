import { Component, signal, OnInit, OnDestroy } from '@angular/core';
// Importa RouterOutlet y RouterLink
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true, // Asegúrate que sea true
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink
    ], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('sgcm-frontend');
  protected currentTime = signal(new Date());
  private intervalId?: number;

  ngOnInit(): void {
    this.intervalId = window.setInterval(() => {
      this.currentTime.set(new Date());
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}