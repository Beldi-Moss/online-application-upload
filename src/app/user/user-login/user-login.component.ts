import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormComponent } from '../form/form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { customEmailValidator } from 'src/utils/custom-validators';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
/**
 * User Login component
 */
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit, OnDestroy{
  _dialogRef : MatDialogRef<any, any>;
  credential: any = {
    email: null,
    password: null
  }
  showErrorLogin = false;
  loading = false;
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, public dialog: MatDialog,private fbs: FirebaseService, public dialogRef: MatDialogRef<FormComponent>) {}
    ngOnInit(){
      this.loginForm = this.fb.group({
        'email' : ['',[Validators.required, customEmailValidator()]],
        'password' : ['',[Validators.required]],
      })

    }
    async login(form){
      try{

        this.loading = true;
        this.showErrorLogin = false;
        this.loginForm.disable()
        await this.fbs.signInUser(form)
        this.router.navigateByUrl('/user');
      } catch(er) {
          this.showErrorLogin = true;
      }
      this.loginForm.enable();
      this.loading = false;
        }
    onNoClick(): void {
      this._dialogRef.close();
    }
    openDialog(): void {
      this._dialogRef = this.dialog.open(FormComponent,{
        hasBackdrop: false
      });

      this._dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
      });
    }
    ngOnDestroy(){
      if( this._dialogRef ) this._dialogRef.close();
    }
}
