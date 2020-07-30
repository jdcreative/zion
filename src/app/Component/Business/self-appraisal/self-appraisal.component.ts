import { Component, OnInit } from '@angular/core';
import { SSTService } from 'src/app/service/sst.service';
import { SelfAppraisal } from 'src/app/Models/self-appraisal';
import { SSOService } from 'src/app/service/sso.service';
import { StandardCompany } from 'src/app/Models/standard-company';
import { UserSelfAppraisal } from 'src/app/Models/user-self-appraisal';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UploadImageComponent } from '../../Modals/upload-image/upload-image.component';
import { CommunicationService } from '../../../service/communication.service';
import { Router } from '@angular/router';
import { ConfirmDialogService } from 'src/app/service/confirm-dialog.service';
import { ConfirmPayment } from 'src/app/Models/confirm-payment';
import { ListFileComponent } from '../../Modals/list-file/list-file.component';

@Component({
  selector: 'app-self-appraisal',
  templateUrl: './self-appraisal.component.html',
  styleUrls: ['./self-appraisal.component.css']
})
export class SelfAppraisalComponent implements OnInit {

  selfAppraisal: SelfAppraisal[];
  closeResult: string;
  message: string;

  constructor(
    private sstService: SSTService,
    private ssoService: SSOService,
    private communicationService: CommunicationService,
    private modalBootstrapService: NgbModal,
    private router: Router,
    private confirmDialogService: ConfirmDialogService
  ) { } 

  ngOnInit() {
    this.GetSelfAppraisal();
    this.getConfirmPayment();
  }

  getConfirmPayment(){
    this.sstService.getConfirmPayment(this.ssoService.getValue('LOGIN_NICKNAME'))
    .subscribe((res: ConfirmPayment) => {
      localStorage.setItem("CONFIRMPAYMENT", res.Confirm.toString());
    }, (err: any) => {
      console.error(err);
    });
  }

  GetSelfAppraisal() {
    this.sstService.getSelfAppraisal(this.ssoService.getValue('LOGIN_NICKNAME'), 'SelfAppraisalComponent').subscribe(res => {
      this.selfAppraisal = res;
    }, (err: any) => {
      console.error(err);
    });
  }

  SendSelfAppraisal(selfAppraisal: SelfAppraisal) {
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

  ListImage(value: any) {
    this.SendSelfAppraisal(value);
    var modalSingIn = this.modalBootstrapService.open(ListFileComponent, { size: 'lg' }).result.then((result) => {
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

  OnChangeStandard(value: number) {
    let standardCompany: StandardCompany;
    standardCompany = {
      standard: value,
      user: this.ssoService.getValue('LOGIN_NICKNAME')
    };
    this.sstService.updateStandardCompany(standardCompany).subscribe(res => {
      console.log(res);
    }, (err: any) => {
      console.error(err);
    });
  }

  SaveSelfAppraisal() {
    this.confirmDialogService.confirm('Confirmar guardado', '¿Esta seguro que quiere guardar la información?', 'Aceptar', 'Cancelar', 'lg')
      .then((confirmed) =>
        this.Save(confirmed)
      )
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  Save(confirm: boolean) {
    if (confirm) {
      let userSelfAppraisal: UserSelfAppraisal;
      userSelfAppraisal = {
        user: this.ssoService.getValue('LOGIN_NICKNAME')
      };
      this.router.navigateByUrl('TimeEstimation');
    }
  }

  CancelSelfAppraisal() {
    this.router.navigateByUrl('ServiceList');
  }
}
