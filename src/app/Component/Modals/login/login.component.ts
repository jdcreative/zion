import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SSOService } from 'src/app/service/sso.service';
import { Login } from 'src/app/Models/login';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  returnUrl: string;
  user: Login;
  error: string;

  constructor(
    private router: Router,
    public activeModal: NgbActiveModal,
    private ssoService: SSOService
  ) 
  { 
    this.login = this.CreateFormGroup()
  }

  CreateFormGroup(){
    return new FormGroup({
      nickName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(20)])
    });
  }

  ngOnInit() {
  }

  Login(login: any, url: string, messageError: string){
    this.ssoService.postLogin(login.value).subscribe(res => {
      if(res.Id !== 0){
        this.router.navigateByUrl(url);
        this.CloseModal();
      }else{
        this.error = messageError;
      }
    });
  }

  onSubmit(login: any){
    this.error = undefined;
    this.Login(login, '/CompanyInformation', 'El usurio o la contraseña no son invalidos.');
  }

  CloseModal() {
    this.activeModal.close('Modal Closed');
  }
}
