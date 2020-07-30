import { Component, OnInit } from '@angular/core';
import { SSTService } from 'src/app/service/sst.service';
import { SSOService } from 'src/app/service/sso.service';
import { ImprovementPlan } from 'src/app/Models/improvement-plan';
import { StandardCompany } from 'src/app/Models/standard-company';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SelfAppraisal } from 'src/app/Models/self-appraisal';
import { CommunicationService } from 'src/app/service/communication.service';
import { UploadImageComponent } from '../../Modals/upload-image/upload-image.component';
import { ListFileComponent } from '../../Modals/list-file/list-file.component';

@Component({
  selector: 'app-improvement-plan',
  templateUrl: './improvement-plan.component.html',
  styleUrls: ['./improvement-plan.component.css']
})
export class ImprovementPlanComponent implements OnInit {

  improvementPlan: ImprovementPlan[];
  closeResult: string;

  constructor(
    private ssoService: SSOService,
    private sstService: SSTService,
    private router: Router,
    private modalBootstrapService : NgbModal,
    private communicationService: CommunicationService,
  ) { }

  ngOnInit() {
    this.GetImprovementPlan();
  }

  GetImprovementPlan(){
    this.sstService.getImprovementPlan(this.ssoService.getValue('LOGIN_NICKNAME')).subscribe(res => {
      this.improvementPlan = res;
      console.log(this.improvementPlan);
    }, (err: any) => {
      console.error(err);
    });
  }

  OnChangeImprovementPlan(value: number){
    let standardCompany: StandardCompany;
    standardCompany = {
      standard: value,
      user: this.ssoService.getValue('LOGIN_NICKNAME')
    };
    this.sstService.updateStandardCorrection(standardCompany).subscribe(res => {
      console.log(res);
    }, (err: any) => {
      console.error(err);
    });
  }

  ListImage(value: any) {
    this.SendSelfAppraisal(value);
    var modalSingIn = this.modalBootstrapService.open(ListFileComponent, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  CancelImprovementPlan(){
    this.router.navigateByUrl('ServiceList');
  }

  SendSelfAppraisal(imp: ImprovementPlan) {
    let selfAppraisal: SelfAppraisal;
    selfAppraisal = {
      Id: imp.Id,
      Name: imp.Name,
      Description: imp.Action,
      Evidence: imp.Action,
      Comply: imp.Correction,
      DateMaximumDate: imp.DateMaximumDate
    };
    this.communicationService.SendSelfAppraisal(selfAppraisal);
  }


  UploadImage(value: any) {
    this.SendSelfAppraisal(value);
    var modalSingIn = this.modalBootstrapService.open(UploadImageComponent, { size: 'lg' }).result.then((result) => {
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
