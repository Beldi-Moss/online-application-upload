import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UserLoginComponent } from '../user-login/user-login.component';
import { FormComponent } from '../form/form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entry-point',
  templateUrl: './entry-point.component.html',
  styleUrls: ['./entry-point.component.scss']
})
export class EntryPointComponent implements OnInit, OnDestroy {
  dialogRef : MatDialogRef<any, any>;
  constructor(public dialog: MatDialog, private router: Router) { }
  ngOnDestroy(){
      this.dialogRef.close();
  }
  ngOnInit() {
   this.openDialog();
  }
  openDialog(): void {
    this.dialogRef = this.dialog.open(UserLoginComponent, {
        role: "alertdialog",
        backdropClass: "customBackDrop"
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl('/');
    });
  }
}
