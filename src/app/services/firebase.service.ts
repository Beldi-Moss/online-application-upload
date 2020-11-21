import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import RequestModel from '../models/requestModel';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/internal/operators';
import  * as firebase from "firebase";
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  requestCollection: AngularFirestoreCollection<RequestModel>;
  userCollection : AngularFirestoreCollection<RequestModel>;

  constructor(private fstore: AngularFirestore, private fauth: AngularFireAuth) {
    this.requestCollection = this.fstore.collection('requests');
    this.userCollection = this.fstore.collection('users');
  }

  sendRequest (data: RequestModel) : Promise<void>  {
    const id = this.fstore.createId();
    data.id = id;
    return this.requestCollection.doc(id).set(data);
  }

  createUser(data) : Promise<void>  {
    data.created_at = firebase.firestore.FieldValue.serverTimestamp()
    return this.userCollection.doc(data.id).set(data);
  }

  signInUser({email, password}) :Promise<firebase.auth.UserCredential>{
      return this.fauth.auth.signInWithEmailAndPassword(email, password)
  }

  isUserAuthenticated() {
    return this.fauth.authState.pipe(first()).toPromise();

  }

  signOut() {
    return this.fauth.auth.signOut();
  }

}
