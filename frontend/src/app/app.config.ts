import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),  // Mantén esta línea si es necesaria
    provideRouter(routes),  // Mantén la configuración de rutas
    provideClientHydration(),  // Mantén esta línea si es necesaria
    provideHttpClient(withFetch()),  // Agrega HttpClientModule aquí
  ],
};

