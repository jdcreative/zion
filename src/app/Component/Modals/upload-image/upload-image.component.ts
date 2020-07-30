import { Component, OnInit } from '@angular/core';
import { CommunicationService } from 'src/app/service/communication.service';
import { SelfAppraisal } from 'src/app/Models/self-appraisal';
import { SSOService } from 'src/app/service/sso.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SSTService } from 'src/app/service/sst.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  selfAppraisal: SelfAppraisal;
  selectedFile: Array<File> = new Array<File>();

  constructor(
    private modalBootstrapService : NgbModal,
    private sstService: SSTService,
    public activeModal: NgbActiveModal,
    private communicationService: CommunicationService,
    private ssoService: SSOService
  ) { 
  }

  onFileSelected(event){
    let files: File[];
    files = <File[]>event.target.files;
    for (let index = 0; index < files.length; index++) {
      if(files[index].type.includes('image') || files[index].type.includes('application/pdf')){
        console.log(files[index]);
        this.selectedFile.push(files[index]);
      }
    }
  }

  onFileDelete(index: number){
    this.selectedFile.splice(index, 1);
  }

  onUpload(){
    const fd = new FormData();
    let count = 0;
    for (let index = 0; index < this.selectedFile.length; index++) {
      fd.append('image' + index.toString(), this.selectedFile[index], this.selectedFile[index].name);
    }
    fd.append('User', this.ssoService.getValue('LOGIN_NICKNAME')); 
    fd.append('IdStandard', this.selfAppraisal.Id.toString());
    this.sstService.upLoadFile(fd).subscribe((res) => {
      console.log(res);
      this.Close();
    }, (err: any) => {
      console.error(err);
    });
  }

  ngOnInit() {
    this.selfAppraisal = this.communicationService.selfAppraisal;
  }

  Close(){
    this.modalBootstrapService.dismissAll();
  }
}
