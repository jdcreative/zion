import { Component } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SingInComponent } from './Component/Modals/sing-in/sing-in.component';
import { LoginComponent } from './Component/Modals/login/login.component';
import { SSOService } from 'src/app/service/sso.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ZionSST';
  closeResult: string;

  constructor(
    private ssoService: SSOService,
    private router: Router,
    private modalBootstrapService: NgbModal
  ) { }

  isLogin() {
    let nickname: string = this.ssoService.getValue('LOGIN_NICKNAME');
    if (nickname === undefined || nickname === '' || nickname === null) {
      return false;
    } else {
      return true;
    }
  }

  SingIn() {
    var modalSingIn = this.modalBootstrapService.open(SingInComponent, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  Login() {
    var modalLogin = this.modalBootstrapService.open(LoginComponent).result.then((result) => {
      this.closeResult = `Closed with: ${result}`
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
