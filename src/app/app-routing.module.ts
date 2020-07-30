import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Page ZionSST
import { HomeComponent } from './Component/PageZionSSt/home/home.component';
import { ZionSSTComponent } from './Component/PageZionSST/zion-sst/zion-sst.component';
import { WeComponent } from './Component/PageZionSSt/we/we.component';
import { FrequentQuestionsComponent } from './Component/PageZionSSt/frequent-questions/frequent-questions.component';
import { ContactUsComponent } from './Component/PageZionSSt/contact-us/contact-us.component';

//Business
import { CompanyInformationComponent } from './Component/Business/company-information/company-information.component';

//Guards
import { BusinessInformationGuard } from './guards/business-information.guard';
import { ListServiceComponent } from './Component/Business/list-service/list-service.component';
import { SelfAppraisalComponent } from './Component/Business/self-appraisal/self-appraisal.component';
import { BusinessSelfAppraisalGuard } from './guards/business-self-appraisal.guard';
import { BusinessHomeGuard } from './guards/business-home.guard';
import { BusinessStateLoginGuard } from './guards/business-state-login.guard';
import { ImprovementPlanComponent } from './Component/Business/improvement-plan/improvement-plan.component';
import { ConfirmPaymentGuard } from './guards/confirm-payment.guard';
import { PaymentFormComponent } from './Component/Business/payment-form/payment-form.component';
import { TimeEstimationComponent } from './Component/Business/time-estimation/time-estimation.component';
import { StateCompanyGuard } from './guards/state-company.guard';


const routes: Routes = [
{path: '', component:HomeComponent, canActivate: [BusinessHomeGuard]},
{path: 'We', component:WeComponent, canActivate: [BusinessHomeGuard]},
{path: 'zionsst', component:ZionSSTComponent, canActivate: [BusinessHomeGuard]},
{path: 'frequentQuestions', component:FrequentQuestionsComponent, canActivate: [BusinessHomeGuard]},
{path: 'contactUs', component:ContactUsComponent, canActivate: [BusinessHomeGuard]},
{path: 'CompanyInformation', component:CompanyInformationComponent, canActivate: [BusinessInformationGuard, BusinessStateLoginGuard]},
{path: 'ServiceList', component:ListServiceComponent, canActivate: [BusinessStateLoginGuard]},
{path: 'SelfAppraisal', component:SelfAppraisalComponent, canActivate: [BusinessSelfAppraisalGuard, BusinessStateLoginGuard, StateCompanyGuard]},
{path: 'TimeEstimation', component:TimeEstimationComponent, canActivate: [BusinessSelfAppraisalGuard, BusinessStateLoginGuard, StateCompanyGuard]},
{path: 'ImprovementPlan', component:ImprovementPlanComponent, canActivate: [BusinessStateLoginGuard, ConfirmPaymentGuard]},
{path: 'PaymentForm', component:PaymentFormComponent, canActivate: [BusinessStateLoginGuard]}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
