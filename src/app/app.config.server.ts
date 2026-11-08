import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { HttpBackend } from '@angular/common/http';
import { SERVER_API_ORIGIN, ServerApiBackend } from './core/ssr';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    // API_ORIGIN is set on Vercel; without it (local dev) environment.apiUrl is already absolute
    { provide: SERVER_API_ORIGIN, useValue: process.env['API_ORIGIN'] ?? 'https://ecommerce-backend-sv5n.onrender.com' },
    { provide: HttpBackend, useClass: ServerApiBackend },
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
