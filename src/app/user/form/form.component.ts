import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import RequestModel from 'src/app/models/requestModel';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatStepper } from '@angular/material';
import { CommonApplicationUploaderComponent } from './common-application-uploader/common-application-uploader.component';
import { CredentialComponent } from './credential/credential.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  emailExist
  isLinear = false;
  credential: {email: string, password: string};
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  basicInfoData : RequestModel ;
  @ViewChild(BasicInfoComponent, {static : true})  basicInfoComponent : BasicInfoComponent;
  @ViewChild(EmailVerificationComponent, {static : true})  emailVerificationComponent : EmailVerificationComponent;
  @ViewChild(CommonApplicationUploaderComponent, {static : true})  caComponent : CommonApplicationUploaderComponent;
  @ViewChild(CredentialComponent, {static : true})  credentialComponent : CredentialComponent;

  @ViewChild('stepper', {static: true}) private myStepper: MatStepper;

  constructor(private _formBuilder: FormBuilder,   public dialogRef: MatDialogRef<FormComponent>) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }
 
  saveBasicInformationData(data){
    this.basicInfoData = data;
  }
  saveCredentialInformation (data) {
    Object.assign(this.basicInfoData, data || {});
    this.credential = data
  }
  goBack(data){
      this.emailExist= data;
      this.myStepper.previous();

  }
 
  goForward(data){
    
    setTimeout(() => {this.myStepper.next();});
  } 
}