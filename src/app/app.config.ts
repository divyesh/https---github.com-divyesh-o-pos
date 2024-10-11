import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [DecimalPipe, provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient()]
};
