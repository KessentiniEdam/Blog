// import { Injectable } from '@angular/core';

// import {
//   HttpInterceptor,
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpErrorResponse
// } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { Router } from '@angular/router';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//   constructor(private router: Router) {}
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//   // Skip token for login or registration endpoints
//   if (request.url.includes('/auth/login') || request.url.includes('/auth/register')) {
//     return next.handle(request);
//   } 

//   const token = localStorage.getItem('jwtToken');
//   if (token) {
    
//     request = request.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//   }

//   return next.handle(request).pipe(
    
//     catchError((error: HttpErrorResponse) => {
      
//       if (error.status === 401) {
//         localStorage.removeItem('jwtToken');
//         this.router.navigate(['/login']);
//       }
//       return throwError(() => error);
//     })
//   );
// }
// }