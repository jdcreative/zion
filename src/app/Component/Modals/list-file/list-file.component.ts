import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelfAppraisal } from 'src/app/Models/self-appraisal';
import { CommunicationService } from 'src/app/service/communication.service';
import { SSTService } from 'src/app/service/sst.service';
import { ObjectFiles } from 'src/app/Models/object-files';
import { SSOService } from 'src/app/service/sso.service';
import { DeleteFile } from 'src/app/Models/delete-file';

@Component({
  selector: 'app-list-file',
  templateUrl: './list-file.component.html',
  styleUrls: ['./list-file.component.css']
})
export class ListFileComponent implements OnInit {

  selfAppraisal: SelfAppraisal;
  listFiles: ObjectFiles[];

  constructor(
    private modalBootstrapService: NgbModal,
    private sstService: SSTService,
    private communicationService: CommunicationService,
    public activeModal: NgbActiveModal,
    private ssoService: SSOService
  ) { }

  Close() {
    this.modalBootstrapService.dismissAll();
  }

  getListFile() {
    this.sstService.listFile(this.ssoService.getValue('LOGIN_NICKNAME'),
      this.selfAppraisal.Id.toString()).subscribe((res) => {
        this.listFiles = res;
      }, (err: any) => {
        console.error(err);
      });
  }

  deleteFile(value: ObjectFiles, index: number) {
    let file: DeleteFile;
    file = {
      NameFile: value.Name,
      Nit: value.Nit,
      Standard: this.selfAppraisal.Id
    }
    this.sstService.deleteFile(file).subscribe((res) => {
      this.listFiles.splice(index, 1);
        console.log(res);
      }, (err: any) => {
        console.error(err);
      });
  }

  ngOnInit() {
    this.selfAppraisal = this.communicationService.selfAppraisal;
    this.getListFile();
  }

}
