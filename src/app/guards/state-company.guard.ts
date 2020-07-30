import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SSTService } from '../service/sst.service';
import { SSOService } from '../service/sso.service';

@Injectable({
  providedIn: 'root'
})
export class StateCompanyGuard implements CanActivate {

  state: boolean = true;

  constructor(
    private router: Router,
    private ssoService: SSOService,
    private sstService: SSTService
  ){
    this.stateCompany();
  }

  canActivate(){ 
    return this.state;
  }

  stateCompany(){
    this.sstService.stateCompany(this.ssoService.getValue('LOGIN_NICKNAME')).subscribe(res =>{
      if(res.state === 3){
        this.router.navigateByUrl('ImprovementPlan');
        this.state = false;
      }else{
        this.state = true;
      }
    },
    (err: any)=>{
      console.error(err);
    });
  }
}
