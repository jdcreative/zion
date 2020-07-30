import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConfirmPaymentGuard implements CanActivate {

  constructor(
    private router: Router
  ){}

  canActivate(){  
    let confirm: string;
    confirm = String(localStorage.getItem("CONFIRMPAYMENT"));
    
    if(confirm === 'true'){
      return true;
    }else{
      this.router.navigateByUrl('PaymentForm');
      return false;
    }
    
  }
}
