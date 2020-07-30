import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'
import { SelfAppraisal } from '../Models/self-appraisal';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  selfAppraisal: SelfAppraisal;
  private sendSelfAppraisalSubject = new Subject<string>();
  sendSelfAppraisalObservable = this.sendSelfAppraisalSubject.asObservable();

  isLogin: boolean;
  private isLoginSubject = new Subject<boolean>();
  isLoginObservable = this.isLoginSubject.asObservable();

  Login(){
    this.isLogin = true;
    this.isLoginSubject.next(true);
  }

  OnLogin(){
    this.isLogin = false;
    this.isLoginSubject.next(false);
  }


  SendSelfAppraisal(selfAppraisal: SelfAppraisal){
    this.selfAppraisal = selfAppraisal;
    this.sendSelfAppraisalSubject.next(JSON.stringify(selfAppraisal));
  }
  constructor() { }
}
