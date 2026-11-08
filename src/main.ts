import { ErrorHandler, mergeApplicationConfig } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { ReportingErrorHandler } from './app/core/error-reporting';

// browser only: the server renderer (main.server.ts) keeps Angular's default handler
const browserConfig = mergeApplicationConfig(appConfig, {
  providers: [{ provide: ErrorHandler, useClass: ReportingErrorHandler }],
});

bootstrapApplication(AppComponent, browserConfig)
  .catch((err) => console.error(err));
