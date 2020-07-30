import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SingInComponent } from '../../Modals/sing-in/sing-in.component';
import { LoginComponent } from '../../Modals/login/login.component';
import { SSOService } from 'src/app/service/sso.service';
import { Router} from '@angular/router';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  closeResult: string;
  year: string;
  date = new Date();


  constructor(
    private ssoService: SSOService,
    private router: Router,
    private modalBootstrapService : NgbModal
  ) { 
    this.year = formatDate(this.date, 'yyyy', 'en-US');
  }

  ngOnInit() {
  }

  SingIn(){
    var modalSingIn = this.modalBootstrapService.open(SingInComponent, { size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`
    },(reason) =>{
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  Login(){
    var modalLogin = this.modalBootstrapService.open(LoginComponent).result.then((result) => {
      this.closeResult = `Closed with: ${result}`
    },(reason) =>{
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  OnLogin(){
    localStorage.removeItem("CONFIRMPAYMENT");
    this.ssoService.LogOut();
    this.router.navigate(['']);
  }

  isLogin() {
    let nickname: string = this.ssoService.getValue('LOGIN_NICKNAME');
    if (nickname === undefined || nickname === '' || nickname === null) {
      return false;
    } else {
      return true;
    }
  }

  private getDismissReason(reason: any): string{
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
