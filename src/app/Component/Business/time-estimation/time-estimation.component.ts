import { Component, OnInit } from '@angular/core';
import { SelfAppraisal } from 'src/app/Models/self-appraisal';
import { SSTService } from 'src/app/service/sst.service';
import { SSOService } from 'src/app/service/sso.service';
import { Router } from '@angular/router';
import { EditDateComponent } from '../../Modals/edit-date/edit-date.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'src/app/service/communication.service';
import { ConfirmDialogService } from 'src/app/service/confirm-dialog.service';
import { UserSelfAppraisal } from 'src/app/Models/user-self-appraisal';

@Component({
  selector: 'app-time-estimation',
  templateUrl: './time-estimation.component.html',
  styleUrls: ['./time-estimation.component.css']
})
export class TimeEstimationComponent implements OnInit {

  selfAppraisal: SelfAppraisal[];
  closeResult: string;

  constructor(
    private router: Router,
    private ssoService: SSOService,
    private modalBootstrapService: NgbModal,
    private communicationService: CommunicationService,
    private confirmDialogService: ConfirmDialogService,
    private sstService: SSTService
  ) { }

  GetSelfAppraisal() {
    this.sstService.getSelfAppraisal(this.ssoService.getValue('LOGIN_NICKNAME'), 'TimeEstimationComponent').subscribe(res => {
      this.selfAppraisal = res.filter(x => x.Comply === false);
    }, (err: any) => {
      console.error(err);
    });
  }

  CancelTimeEstimation() {
    this.router.navigateByUrl('ServiceList');
  }

  ngOnInit() {
    this.GetSelfAppraisal();
  }

  changeComfir(index: number, event){
    var p = document.getElementById(index.toString());
    console.log(event);
  }

  behindSelfAppraisal(){
    this.confirmDialogService.confirm('Volver', 'Debe tener que al volver se borraran los cambios realizados en este proceso. ¿Esta seguro que quiere volver a autoevaluación?', 'Aceptar', 'Cancelar', 'lg')
      .then((confirmed) =>
          this.confirmBehindSelfAppraisal(confirmed)
      )
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  confirmBehindSelfAppraisal(confirm: boolean){
    if(confirm){
      this.router.navigateByUrl('SelfAppraisal');
    }
  }

  SaveSelfAppraisal(){
    this.confirmDialogService.confirm('Guardar información', '¿Esta seguro que quiere guardar la información?', 'Aceptar', 'Cancelar', 'lg')
      .then((confirmed) =>
          this.confirmSave(confirmed)
      )
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  confirmSave(confirm: boolean){
    if (confirm) {
      let userSelfAppraisal: UserSelfAppraisal;
      userSelfAppraisal = {
        user: this.ssoService.getValue('LOGIN_NICKNAME')
      };
      this.sstService.saveSelfAppraisal(userSelfAppraisal).subscribe(res => {
        this.router.navigateByUrl('ImprovementPlan');
      }, (err: any) => {
        console.error(err);
      })
    }
  }

  disableBotton (index: number){
    return true;
  }

  EditDate(value: any) {
    this.communicationService.SendSelfAppraisal(value);
    var modalSingIn = this.modalBootstrapService.open(EditDateComponent, { size: 'lg' }).result.then((result) => {
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
