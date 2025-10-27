import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
// Importa provideHttpClient
import { provideHttpClient } from '@angular/common/http'; // Asegúrate que esta línea esté

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideBrowserGlobalErrorListeners(), // Esta línea parece no estar en tu archivo, si está, déjala.
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient() // <--- Añade esto
  ]
};