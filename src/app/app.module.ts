import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//http client
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
//Bootstrap
import{ NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
//Modulo de formularios reactivos
import{ ReactiveFormsModule, FormsModule } from '@angular/forms';

//Interceptor
import {SSTAuthInterceptorService} from './Interceptor/sst-auth-interceptor.service'

//Directive
import { CompareValidatorDirective } from './shared/compare-validator.directive';

//Spinner
import { NgxSpinnerModule } from 'ngx-spinner';

//upload
//import { AngularFileUploaderModule } from "angular-file-uploader";
import { FileSelectDirective } from 'ng2-file-upload';

//Componentes Page
import { HomeComponent } from './Component/PageZionSSt/home/home.component';
import { ZionSSTComponent } from './Component/PageZionSST/zion-sst/zion-sst.component';
import { SingInComponent } from './Component/Modals/sing-in/sing-in.component';
import { LoginComponent } from './Component/Modals/login/login.component';
import { MenuComponent } from './Component/PageZionSSt/menu/menu.component';
import { WeComponent } from './Component/PageZionSSt/we/we.component';
import { FrequentQuestionsComponent } from './Component/PageZionSSt/frequent-questions/frequent-questions.component';
import { ContactUsComponent } from './Component/PageZionSSt/contact-us/contact-us.component';
import { CompanyInformationComponent } from './Component/Business/company-information/company-information.component';
import { ListServiceComponent } from './Component/Business/list-service/list-service.component';
import { SelfAppraisalComponent } from './Component/Business/self-appraisal/self-appraisal.component';
import { UploadImageComponent } from './Component/Modals/upload-image/upload-image.component';
import { ImprovementPlanComponent } from './Component/Business/improvement-plan/improvement-plan.component';
import { ConfirmDialogComponent } from './Component/PageZionSST/confirm-dialog/confirm-dialog.component'
import { ConfirmDialogService } from './service/confirm-dialog.service';
import { MenuLoginComponent } from './Component/PageZionSST/menu-login/menu-login.component';
import { FooterComponent } from './Component/PageZionSST/footer/footer.component';
import { PaymentFormComponent } from './Component/Business/payment-form/payment-form.component';
import { ListFileComponent } from './Component/Modals/list-file/list-file.component';
import { TimeEstimationComponent } from './Component/Business/time-estimation/time-estimation.component';
import { EditDateComponent } from './Component/Modals/edit-date/edit-date.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SingInComponent,
    LoginComponent,
    ZionSSTComponent,
    MenuComponent,
    WeComponent,
    FrequentQuestionsComponent,
    ContactUsComponent,
    CompareValidatorDirective,
    CompanyInformationComponent,
    ListServiceComponent,
    SelfAppraisalComponent,
    UploadImageComponent,
    ImprovementPlanComponent,
    ConfirmDialogComponent,
    MenuLoginComponent,
    FooterComponent,
    PaymentFormComponent,
    FileSelectDirective,
    ListFileComponent,
    TimeEstimationComponent,
    EditDateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    BootstrapModalModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: SSTAuthInterceptorService,
    multi: true
  },
  ConfirmDialogService
  ],
  bootstrap: [AppComponent],
  entryComponents:[
    SingInComponent,
    LoginComponent,
    UploadImageComponent,
    ConfirmDialogComponent,
    ListFileComponent,
    EditDateComponent]
})
export class AppModule { }
