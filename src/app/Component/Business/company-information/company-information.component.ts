import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SSTService } from 'src/app/service/sst.service';
import { RiskLevelTypeCompany } from 'src/app/Models/risk-level-type-company';
import { TypeCompany } from 'src/app/Models/type-company';
import { RiskLevel } from 'src/app/Models/risk-level';
import { Company } from 'src/app/Models/company';
import { SSOService } from 'src/app/service/sso.service';
import { Response } from 'src/app/Models/response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-information',
  templateUrl: './company-information.component.html',
  styleUrls: ['./company-information.component.css']
})

export class CompanyInformationComponent implements OnInit {
  companyInformation: FormGroup;
  riskLevel: RiskLevel[];
  typeCompany: TypeCompany[];
  company: Company;
  nickName: string;
  numPattern: any = /^([0-9])*$/;

  constructor(
    private router: Router,
    private sstService: SSTService,
    private ssoService: SSOService
    ) { 
    this.companyInformation = this.CreateFormGroup()
  }

  CreateFormGroup(){
    return new FormGroup({
      nit: new FormControl('', [Validators.required, Validators.maxLength(11), Validators.minLength(10), Validators.pattern(this.numPattern)]),
      socialReason: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      riskLevel: new FormControl('', [Validators.required]),
      typeCompany: new FormControl('', [Validators.required]),
      countEmployee: new FormControl('', [Validators.required, Validators.pattern(this.numPattern)]),
      activity: new FormControl('', [Validators.required, Validators.maxLength(300)]),
      nickName: new FormControl('')
    });
  }

  ngOnInit() {
    this.getRiskLevelTypeCompany();
  }

  getRiskLevelTypeCompany() {
    this.sstService.getRiskLevelTypeCompany().subscribe((rltc: RiskLevelTypeCompany)=>{
      this.riskLevel = rltc.RiskLevel;
      this.typeCompany = rltc.TypeCompany;
    }, (err: any) => {
      console.error(err);
    });
  }

  SaveCompany(){
    this.companyInformation.value.nickName = this.ssoService.getValue('LOGIN_NICKNAME');
    this.company = this.companyInformation.value;
    this.sstService.setCompany(this.company).subscribe((response: Response) => {
      localStorage.setItem("LOGIN_COUNTCOMPANY", '1');
      this.router.navigateByUrl('ServiceList');
      alert(response.Message);
    }, (err: any) => {
      console.error(err);
    });
  }
}
