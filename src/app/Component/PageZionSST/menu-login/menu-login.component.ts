import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SingInComponent } from '../../Modals/sing-in/sing-in.component';
import { LoginComponent } from '../../Modals/login/login.component';
import { SSOService } from 'src/app/service/sso.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html',
  styleUrls: ['./menu-login.component.css']
})
export class MenuLoginComponent implements OnInit {
  closeResult: string;
  name: string;

  constructor(
    private ssoService: SSOService,
    private router: Router,
    private modalBootstrapService : NgbModal
  ) { }

  isLogin(){
    let nickname: string = this.ssoService.getValue('LOGIN_NICKNAME');
    if(nickname === undefined || nickname === '' || nickname === null){
      return false;
    }else{
      this.name = this.ssoService.getValue('LOGIN_NAME');
      return true;
    }
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

  EventLoginOrSingIn(e){
    switch(e.target.innerHTML){
      case "Regístrate":
        this.SingIn();
        break;
      case "Iniciar sesión":
        this.Login();
        break;
      case "Cerrar sesión":
        localStorage.removeItem("CONFIRMPAYMENT");
        this.ssoService.LogOut();
        this.router.navigate(['']);
          break
      default:
        this.router.navigateByUrl('ServiceList');
        break;
    };
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
