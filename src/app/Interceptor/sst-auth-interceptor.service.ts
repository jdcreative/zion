import { Injectable } from '@angular/core';
import { SSOService } from '../service/sso.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SSTAuthInterceptorService implements HttpInterceptor{
  constructor(
    private ssoService: SSOService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var token = this.ssoService.getValue('ACCESS_TOKEN');
    if (token !== null) {
      req = req.clone({
        setHeaders: {'Authorization': `Bearer ${token}`}
      })
    }
    return next.handle(req);
  }
}
