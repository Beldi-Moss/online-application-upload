import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage/storage';
import { AngularFirestore } from '@angular/fire/firestore/firestore';
import { FirebaseService } from './services/firebase.service';
/**
 * @ignore
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'cv upload';
    path = "../../assets.png"
    constructor(private fbService: FirebaseService ) {}
    ngOnInit() {}
    }
