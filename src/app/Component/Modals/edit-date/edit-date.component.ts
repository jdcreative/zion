import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'src/app/service/communication.service';
import { SelfAppraisal } from 'src/app/Models/self-appraisal';
import { SSOService } from 'src/app/service/sso.service';
import { SSTService } from 'src/app/service/sst.service';
import { EditModel } from 'src/app/Models/edit-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-date',
  templateUrl: './edit-date.component.html',
  styleUrls: ['./edit-date.component.css']
})
export class EditDateComponent implements OnInit {

  selfAppraisal: SelfAppraisal;
  model: NgbDateStruct;
  editDate: EditModel;

  constructor(
    private calendar: NgbCalendar,
    private ssoService: SSOService,
    private sstService: SSTService,
    private modalBootstrapService : NgbModal,
    private communicationService: CommunicationService,
    private router: Router,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.selfAppraisal = this.communicationService.selfAppraisal;
    this.model = this.calendar.getToday();
  }

  Close(){
    this.modalBootstrapService.dismissAll();
    location.reload();
  }

  EditaDate(){
    let day: string;
    let month: string;
    if(this.model.month < 10){
      month = `0${this.model.month}`;
    }else{
      month = `${this.model.month}`;
    }

    if(this.model.day < 10){
      day = `0${this.model.day}`;
    }else{
      day = `${this.model.day}`;
    }

    this.editDate = {
      NickName: this.ssoService.getValue('LOGIN_NICKNAME'),
      Standard: this.selfAppraisal.Id,
      Date: `${day}/${month}/${this.model.year}`
    };
    this.sstService.editDate(this.editDate).subscribe(res => {
      this.Close();
      console.log(res.Message);

    }, (err: any) => {
      console.error(err);
    });

  }
}
