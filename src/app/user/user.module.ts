import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { BasicInfoComponent } from './form/basic-info/basic-info.component';
import { EmailVerificationComponent } from './form/email-verification/email-verification.component';
import { CommonApplicationUploaderComponent } from './form/common-application-uploader/common-application-uploader.component';
import { AdditionalInformationComponent } from './form/additional-information/additional-information.component';
import { ConfirmationComponent } from './form/confirmation/confirmation.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { EntryPointComponent } from './entry-point/entry-point.component';
import { CredentialComponent } from './form/credential/credential.component';
import { HomeComponent } from './home/home.component';
import { UserLoginGuard } from '../guards/user-login-guard.service';
import { UserAuthenticateGuard } from '../guards/user-authenticate-guard.service';

const routes: Routes = [
  {
    path: 'welcome-user',  component: EntryPointComponent, canActivate: [UserLoginGuard],
  },
  {path: '', component: HomeComponent,   canActivate: [UserAuthenticateGuard] ,
  },
  {
    path: '',
    redirectTo: 'welcome-user',
    pathMatch: 'full',
  }
];

@NgModule({
  declarations: [FormComponent, BasicInfoComponent, EmailVerificationComponent, CommonApplicationUploaderComponent, AdditionalInformationComponent, ConfirmationComponent, UserLoginComponent, EntryPointComponent, CredentialComponent, HomeComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModuleModule
  ],
  entryComponents: [UserLoginComponent, FormComponent]
})
export class UserModule { }
