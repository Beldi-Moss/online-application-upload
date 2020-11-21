import { Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import { AngularFireFunctions, AngularFireFunctionsModule } from '@angular/fire/functions';
import { FirebaseService } from 'src/app/services/firebase.service';
export enum State {
  PENDING,
  PROCESSING,
  SUCCESS,
}
@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit, OnChanges {
  @Input() credential;
  @Output() goBack = new EventEmitter();
  @Output() goNext = new EventEmitter();

  startVerification = false;
  verificationCode: number;
  invalidCode = false;
  emailVerified = false;
  localState = {
    state: State.PENDING
  }
  State = State; 
  constructor(private fns: AngularFireFunctions, private fbs: FirebaseService) { }

  ngOnInit() {
  }
  validateToNextStep() {
    this.goNext.emit();    
  }
  ngOnChanges(){
      this.requestVerificationCode()
  } 
  setPendingState(){
    this.localState.state = State.PENDING; 
  }
  setProcessingState(){
    this.localState.state = State.PROCESSING; 
  }
  
  setSuccessState(){
    this.localState.state = State.SUCCESS; 
  }
  requestVerificationCode(){
    if(this.credential && this.credential.email && this.credential.email.length!=0){
      this.setProcessingState();
      var sendVerification = this.fns.httpsCallable('sendVerificationCode');
      console.log("request verification for ", this.credential.email);
      sendVerification({email: this.credential.email}).toPromise().then( (result) => {
          // Read result of the Cloud Function.
          console.log("result... ", result); 
          if(result.code == "email-exist"){
             this.goBack.emit({error: "email-exist", email: this.credential.email});     
          }else if(result.code == "email-verified"){
            this.emailVerified = true;
            this.setSuccessState();  
            this.validateToNextStep();
          }else { 
            this.setPendingState();
          }
        }).catch((error) => {
          console.error(error)
          this.goBack.emit({error: "internal-error"});
          this.setPendingState();
        });
} 
}


  verifyEmail(){
    this.setProcessingState();
      this.invalidCode = false;
      this.startVerification = true;
      const cloudEmailVerificaiton = this.fns.httpsCallable('verifyEmail');
      cloudEmailVerificaiton({email: this.credential.email, code: this.verificationCode, password: this.credential.password}).toPromise().then((result) => {
          const {id, emailVerified } = result;
          console.log(result.emailVerified);
          if(result.emailVerified){  
            this.emailVerified = true;
            this.setSuccessState();
            this.validateToNextStep();
             }else {
               this.setPendingState();
               this.invalidCode = true;
             }
        }).catch((error) => {
          console.error(error)
          this.invalidCode = true;
          this.setPendingState();
        });
  }
}
