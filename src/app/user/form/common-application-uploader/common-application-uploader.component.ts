import { Component, OnInit, Output,EventEmitter,Input } from '@angular/core';
import { UploaderService } from 'src/app/services/file.uploader.service';
import { AngularFireUploadTask, AngularFireStorageReference } from '@angular/fire/storage';
import { Observable, from, of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/internal/operators';
import { FirebaseService } from 'src/app/services/firebase.service';
import RequestModel from 'src/app/models/requestModel';
import { DocumentReference } from '@angular/fire/firestore';
@Component({
  selector: 'app-common-application-uploader',
  templateUrl: './common-application-uploader.component.html',
  styleUrls: ['./common-application-uploader.component.scss']
})
export class CommonApplicationUploaderComponent implements OnInit {
  errorMessage: string;
  uploadError = false;
  pdfFile: File;
  isUploading = false;
  @Input() credential;
  rawData;
  public isUploaded = false;
  public signedIn = false;
  public changes: AngularFireUploadTask;
  public percentage: Observable<number>;
  ref :AngularFireStorageReference;
  @Input() requestModel : RequestModel;
  constructor(private uploaderService: UploaderService,  private firebaseService: FirebaseService) { }
  ngOnInit() {
  }


  cancelUpload(){
    this.changes.cancel();
    this.isUploaded = false;
    this.isUploading = false;
  }
  onImageChangeFromFile(event)
  {
    document.getElementById("sfb").textContent = "Choose Your CA";
      if (event.target.files && event.target.files[0]) {
        let file = this.pdfFile = event.target.files[0];
        document.getElementById("sfb").textContent = file.name;

      }
  }


  upload(){
    this.isUploading = true;
    const {changes, percentage, ref }  = this.uploaderService.uploadImage('files/ca', this.pdfFile);
    this.changes = changes; this.percentage = percentage; this.ref = ref;
    from(this.changes).pipe(
      mergeMap(() =>  ref.getDownloadURL() ),
      mergeMap(async (caUrl)  =>
        {
          const userCredential: firebase.auth.UserCredential = await this.firebaseService.signInUser(this.credential);
          const data = {...this.requestModel, caUrl, id: userCredential.user.uid};
          console.log("uploading....... ", data);
          await this.firebaseService.createUser(data);
        }
        )

      ).subscribe((r)=>{
        // this.signInUser();
        this.uploadError = false;
        this.isUploaded = true;
        this.signedIn = true;
        this.isUploading = false;
      }, err=>{
        if(err.code != "storage/canceled"){
          this.errorMessage = "Error Detected";
          this.uploadError = true;
        }

        this.isUploading = false;
        console.error(err)
      })

  }
}
