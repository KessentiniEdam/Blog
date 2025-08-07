import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AuthInterceptor } from './app/8auth/token.interceptor'; // Make sure this is correct

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // No need for withInterceptors
    provideRouter(routes),
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   // useClass: AuthInterceptor,
    //   multi: true
    // }
  ]
});
