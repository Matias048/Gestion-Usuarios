import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync} from '@angular/platform-browser/animations/async'
import { headerInterceptorInterceptor } from './config/header-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding()), provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(withFetch(), withInterceptors([headerInterceptorInterceptor])),
    provideAnimationsAsync()
  ]
};
