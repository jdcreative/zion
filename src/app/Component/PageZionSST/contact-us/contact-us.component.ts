import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ObjectEmail } from '../../../Models/object-email';
import { SSOService } from 'src/app/service/sso.service';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contact: FormGroup;

  constructor(
    private router: Router,
    private spinnerService: NgxSpinnerService,
    private ssoService: SSOService
  ) {
    this.contact = this.CreateFormGroup()
  }

  CreateFormGroup(){
    return new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Phone: new FormControl('', [Validators.required]),
      EmailContact: new FormControl('', [Validators.required]),
      Message: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
  }
  
  sendMessage(contact){
    let sendEmail: ObjectEmail;

    sendEmail = {
      EmailContact: contact.value.EmailContact,
      Message: contact.value.Message,
      EmailTo: 'mistvel@hotmail.com',
      Name: contact.value.Name,
      Phone: contact.value.Phone,
      Subject: 'SST contactar cliente'
    }
    this.send(sendEmail);
    this.spinnerService.show();
    setTimeout(() => {
      this.spinnerService.hide();
      this.router.navigateByUrl("");
    }, 3000);
  }

  send(sendEmail: ObjectEmail){
    this.ssoService.sendMess(sendEmail).subscribe(res => {
      console.log(res.Message);
    }, (err: any) => {
      console.error(err);
    });
  }
}
