import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MainComponent } from './main/main.component';
import { SharedModuleModule } from './shared-module/shared-module.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database/';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { UploaderService } from './services/file.uploader.service';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    SharedModuleModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    MatDialogModule,
    
    AngularFireFunctionsModule,
    AngularFireDatabaseModule,
     AngularFireStorageModule , AngularFireAuthModule ,
  ],
  providers: [UploaderService,  {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {backdropClass: 'customBackDrop'}} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
