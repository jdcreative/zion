import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http'
import { TypeDocument } from '../Models/type-document';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CityDepartament } from '../Models/city-departament';
import { User } from '../Models/user';
import {Response} from '../Models/response';
import { Login } from '../Models/login';
import { UserLogin } from '../Models/user-login';
import { ObjectEmail } from '../Models/object-email';

@Injectable({
  providedIn: 'root'
})
export class SSOService {

  urlApi = environment.apiSSO;

  authSubject = new BehaviorSubject(false);
    NickName: string;
    DocumentType: string;
    Document: string;
    Name: string;
    Email: string;
    City: string;
    Rol: string;
    CountCompany: string;
    Token: string;

  constructor(private http: HttpClient) { 
  }

  postLogin(user: Login): Observable<UserLogin>{
    return this.http.post<UserLogin>(`${this.urlApi}Login`, user)
      .pipe(tap((res: UserLogin) =>{
        if(res.NickName != null &&  res.DocumentType != null && res.Document != null &&
            res.Name != null && res.Email != null && res.City != null && res.Rol > 0 && res.Token != null){
          
          this.SaveUser(res.NickName, res.DocumentType, res.Document, res.Name, res.Email, res.City, 
            res.Rol.toString(), res.CountCompany.toString(), res.Token);
        }
      }));
  }

  LogOut(): void {
    this.NickName = '';
    this.DocumentType = '';
    this.Document = '';
    this.Name = '';
    this.Email = '';
    this.City = '';
    this.Rol = '';
    this.Token = '';
    this.CountCompany = '';
    localStorage.removeItem("LOGIN_NICKNAME");
    localStorage.removeItem("LOGIN_DOCUMENTTYPE");
    localStorage.removeItem("LOGIN_DOCUMENT");
    localStorage.removeItem("LOGIN_NAME");
    localStorage.removeItem("LOGIN_EMAIL");
    localStorage.removeItem("LOGIN_CITY");
    localStorage.removeItem("LOGIN_ROL");
    localStorage.removeItem("LOGIN_COUNTCOMPANY");
    localStorage.removeItem("ACCESS_TOKEN");
  }

  private SaveUser(NickName: string, DocumentType: string, Document: string, Name: string, Email: string, City: string, 
    Rol: string, CountCompany: string, Token: string): void{
    localStorage.setItem("LOGIN_NICKNAME", NickName);
    localStorage.setItem("LOGIN_DOCUMENTTYPE", DocumentType);
    localStorage.setItem("LOGIN_DOCUMENT", Document);
    localStorage.setItem("LOGIN_NAME", Name);
    localStorage.setItem("LOGIN_EMAIL", Email);
    localStorage.setItem("LOGIN_CITY", City);
    localStorage.setItem("LOGIN_ROL", Rol);
    localStorage.setItem("LOGIN_COUNTCOMPANY", CountCompany);
    localStorage.setItem("ACCESS_TOKEN", Token);
  }

  public getValue(value: string ): string{
    switch(value){
      case "LOGIN_NICKNAME":{
        if(!this.NickName){this.NickName = localStorage.getItem(value);}
        return this.NickName;
      }
      case "LOGIN_DOCUMENTTYPE":{
        if(!this.DocumentType){this.DocumentType = localStorage.getItem(value);}
        return this.DocumentType;
      }
      case "LOGIN_DOCUMENT":{
        if(!this.Document){this.Document = localStorage.getItem(value);}
        return this.Document;
      }
      case "LOGIN_NAME":{
        if(!this.Name){this.Name = localStorage.getItem(value);}
        return this.Name;
      }
      case "LOGIN_EMAIL":{
        if(!this.Email){this.Email = localStorage.getItem(value);}
        return this.Email;
      }
      case "LOGIN_CITY":{
        if(!this.City){this.City = localStorage.getItem(value);}
        return this.City;
      }
      case "LOGIN_ROL":{
        if(!this.Rol){this.Rol = localStorage.getItem(value);}
        return this.Rol;
      }
      case "LOGIN_COUNTCOMPANY":{
        if(!this.CountCompany){this.CountCompany = localStorage.getItem(value);}
        return this.CountCompany;
      }
      case "ACCESS_TOKEN":{
        if(!this.Token){this.Token = localStorage.getItem(value);}
        return this.Token;
      }
      default:{
        return "Valor incorrecto";
      }
    }
  }

  public EntryPermits(exist: string): boolean{
    if(exist === undefined || exist === null){
      return false;
    }
    return true;
  }

  getTypeDocument(): Observable<TypeDocument[]>{
    return this.http.get<TypeDocument[]>(`${this.urlApi}ListDocumentType`);
  }

  getCityDepartament(): Observable<CityDepartament>{
    return this.http.get<CityDepartament>(`${this.urlApi}ListCity`);
  }

  setUser(user: User): Observable<Response>{
    user.rol = 'Usuario SST';
    return this.http.post<Response>(`${this.urlApi}InsertUser`, user);
  }

  sendMess(sendEmail: ObjectEmail):Observable<Response>{
    return this.http.post<Response>(`${this.urlApi}SendMail`, sendEmail);
  }
}
