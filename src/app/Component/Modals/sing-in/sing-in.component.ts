import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SSOService } from 'src/app/service/sso.service';
import { TypeDocument } from 'src/app/Models/type-document';
import { City } from 'src/app/Models/city';
import { Departament } from 'src/app/Models/departament';
import { CityDepartament } from 'src/app/Models/city-departament';
import { User } from 'src/app/Models/user';
import { Response } from 'src/app/Models/response';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent implements OnInit {


  singIn: FormGroup;
  user: User;
  idTypeDocument: TypeDocument[];
  departament: Departament[];
  ct: City[];
  codeDane: City[];
  error: string;


  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  textPattern: any =/^[a-zA-Z_áéíóúñ\s]*$/;
  numPattern: any = /^([0-9])*$/;
  passPattern: any = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

  constructor(
    public activeModal: NgbActiveModal,
    private modalBootstrapService : NgbModal,
    private ssoService: SSOService
  ) {
    this.singIn = this.CreateFormGroup()
  }

  CreateFormGroup(){
    return new FormGroup({
      names: new FormControl('', [Validators.required, Validators.maxLength(40), Validators.pattern(this.textPattern)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(25), Validators.pattern(this.textPattern)]),
      secondSurname: new FormControl('', [Validators.maxLength(25), Validators.pattern(this.textPattern)]),
      address: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(70), Validators.pattern(this.emailPattern)]),
      numberPhone: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern(this.numPattern)]),
      document: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.pattern(this.numPattern)]),
      idTypeDocument: new FormControl('', [Validators.required]),
      departament: new FormControl('', [Validators.required]),
      codeDane: new FormControl('', [Validators.required]),
      nickName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(8), Validators.pattern(this.passPattern)]),
      repeatPassword: new FormControl('', [Validators.required])
    });
    
  }

  ngOnInit() {
    this.getDocumentType();
    this.getCityDepartament();
  }

  getDocumentType(){
    this.ssoService.getTypeDocument().subscribe((td: TypeDocument[])=>{
      this.idTypeDocument = td;
    }, (err: any) => {
      console.error(err);
    });
  }

  getCityDepartament() {
    this.ssoService.getCityDepartament().subscribe((cd: CityDepartament)=>{
      this.ct = cd.City;
      this.departament = cd.Departament;
    }, (err: any) => {
      console.error(err);
    });
  }

  getCity(event: any){
    this.codeDane = this.ct.filter(c => c.CodeDepartament === event.target.value);
  }

  SaveDisabled(){
    return this.singIn.invalid;
  }

  SaveUser(){
    this.user = this.singIn.value;
    console.log('datos del formulario : ', this.singIn.value);
    this.ssoService.setUser(this.user).subscribe((response: Response) => {
      alert(response.Message);
    }, (err: any) => {
      console.error(err);
    });
  }

  Close(){
    this.modalBootstrapService.dismissAll();
  }

}
