import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let tokenizedReq = req.clone({
        setHeaders: {
          Authorization: 'Bearer 75446e9ef9981242c63103f07a5ae8d289d035452af8a316bc4549550eeeaba6'
        }
      })
      return next.handle(tokenizedReq)
  }
}
