import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http'
import { CountObject } from '../Models/count-object';
import { RiskLevelTypeCompany } from '../Models/risk-level-type-company';
import { Company } from '../Models/company';
import {Response} from '../Models/response';
import { SelfAppraisal } from '../Models/self-appraisal';
import { StandardCompany } from '../Models/standard-company';
import { UserSelfAppraisal } from '../Models/user-self-appraisal';
import { ImprovementPlan } from '../Models/improvement-plan';
import { ConfirmPayment } from '../Models/confirm-payment';
import { Observable, throwError } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError } from 'rxjs/operators';
import { ObjectFiles } from '../Models/object-files';
import { DeleteFile } from '../Models/delete-file';
import { EditModel } from '../Models/edit-model';
import { StateCompany } from '../Models/state-company';

@Injectable({
  providedIn: 'root'
})
export class SSTService {
  urlApi = environment.apiSST;
  countObject: Observable<CountObject>;
  

  constructor(
    private http: HttpClient) { 
  }

  getRiskLevelTypeCompany(): Observable<RiskLevelTypeCompany>{
    return this.http.get<RiskLevelTypeCompany>(`${this.urlApi}ListRiskLevelTypeCompany`);
  }

  getSelfAppraisal(user: string, component: string): Observable<SelfAppraisal[]>{
    return this.http.get<SelfAppraisal[]>(`${this.urlApi}ListSelfAppraisal?user=${user}&component=${component}`);
  }

  getImprovementPlan(user: string): Observable<ImprovementPlan[]>{
    return this.http.get<ImprovementPlan[]>(`${this.urlApi}ImprovementPlan?user=${user}`);
  }

  setCompany(company: Company): Observable<Response>{
    return this.http.post<Response>(`${this.urlApi}InsertCompany`, company);
  }

  updateStandardCompany(standardCompany: StandardCompany): Observable<Response>{
    return this.http.post<Response>(`${this.urlApi}UpdateStandardCompany`, standardCompany);
  }

  updateStandardCorrection(standardCompany: StandardCompany): Observable<Response>{
    return this.http.post<Response>(`${this.urlApi}UpdateStandardCorrection`, standardCompany);
  }

  saveSelfAppraisal(userSelfAppraisal: UserSelfAppraisal): Observable<Response>{
    return this.http.post<Response>(`${this.urlApi}SaveSelfAppraisal`, userSelfAppraisal);
  }

  getConfirmPayment(user: string): Observable<ConfirmPayment>{
    return this.http.get<ConfirmPayment>(`${this.urlApi}ConfirmPayment?user=${user}`);
  }

  upLoadFile(formData: FormData): Observable<Response>{
    return this.http.post<Response>(`${this.urlApi}UpLoadFile`, formData);
  }

  listFile(nickname: string, idStandard: string): Observable<ObjectFiles[]>{
    return this.http.get<ObjectFiles[]>(`${this.urlApi}SelectFile?nickName=${nickname}&idStandard=${idStandard}`);
  }

  deleteFile(file: DeleteFile): Observable<Response>{
    return this.http.post<Response>(`${this.urlApi}DeleteFile`, file);
  }

  editDate(edit: EditModel): Observable<Response>{
    return this.http.post<Response>(`${this.urlApi}EditDate`, edit);
  }

  stateCompany(nickname: string){
    return this.http.get<StateCompany>(`${this.urlApi}StateCompany?user=${nickname}`);
  }
}
