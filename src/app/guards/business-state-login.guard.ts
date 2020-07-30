import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SSOService } from 'src/app/service/sso.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessStateLoginGuard implements CanActivate {

  constructor(
    private ssoService: SSOService,
    private router: Router
  ){}

  canActivate(){
    let user: string = this.ssoService.getValue('LOGIN_NICKNAME');  
    if(user === '' || user === null){
      this.router.navigateByUrl('');
      return false;
    }else{
      return true;
    }
  }
  
  
}
