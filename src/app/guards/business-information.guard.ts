import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SSOService } from 'src/app/service/sso.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessInformationGuard implements CanActivate {
  valid: boolean = false;
  
  constructor(
    private ssoService: SSOService,
    private router: Router
    ){}

  canActivate(){
    let count: string = this.ssoService.getValue('LOGIN_COUNTCOMPANY');  
    if(count === '1'){
      this.router.navigateByUrl('ServiceList');
      return false;
    }else{
      return true;
    }
  }
}
