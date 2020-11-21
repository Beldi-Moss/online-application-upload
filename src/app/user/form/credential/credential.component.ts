import { Component, OnInit, Output, EventEmitter, Input, OnChanges} from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import {customEmailValidator} from "../../../../utils/custom-validators";
@Component({
  selector: 'app-credential',
  templateUrl: './credential.component.html',
  styleUrls: ['./credential.component.scss']
})
export class CredentialComponent implements OnInit, OnChanges {
  @Output() onSave = new EventEmitter();
  @Input() emailExist: any= {code: '', email: ''};
  public credentialForm: FormGroup;
  constructor(private fb: FormBuilder) {
     this.initForm();
  }
  confirmPassWordValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const re_pass: String = control.value;
      if(!this.credentialForm || this.credentialForm.controls['password'].value && this.credentialForm.controls['password'].value.trim().length == 0) return null;
      return !(re_pass.trim().toLocaleLowerCase() == this.credentialForm.controls['password'].value.trim().toLocaleLowerCase())? {'wrong': {value: control.value}} : null;
    };
  }
  passWordValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const re_pass: String = control.value;
      if(!this.credentialForm || this.credentialForm.controls['password'].value && this.credentialForm.controls['password'].value.trim().length == 0) return null;
      return !(re_pass.trim().toLocaleLowerCase() == this.credentialForm.controls['password'].value.trim().toLocaleLowerCase())? {'wrong': {value: control.value}} : null;
    };
  }
  ngOnChanges() {
      if(this.emailExist && this.emailExist.email && this.emailExist.email.length != 0 ){
        this.credentialForm.controls['email'].setValue(this.emailExist.email)
      }
  }
  emailUsedValidation(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const email: String = control.value;
      if(!this.emailExist || this.emailExist.email.length == '0') return null;
      return (this.emailExist.email == email)? {'emailUsed': {value: control.value}} : null;
    };
  }

  reValidateRePass() {
      this.credentialForm.controls['re_password'].updateValueAndValidity();
  }
  initForm(){
    this.credentialForm = this.fb.group({
      'email': ['',[Validators.required, Validators.email, customEmailValidator(), this.emailUsedValidation()]],
      'password': ['',[Validators.required, Validators.minLength(8), this.passWordValidator()]],
      're_password': ['',[Validators.required,  this.confirmPassWordValidator() ]],
    })
    this.credentialForm.controls['re_password'].updateValueAndValidity();
  }

  saveUserCredential(form){
     this.onSave.emit({password: form.password, email: form.email });
  }
  ngOnInit() {
  }

}
