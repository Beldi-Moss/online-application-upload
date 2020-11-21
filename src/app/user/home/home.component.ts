import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private fs: FirebaseService, private router: Router) { }

  ngOnInit() {
  }
  async singOut(){
     try{
        await this.fs.signOut();
        this.router.navigateByUrl("/");
     } catch(err){
          alert("Oops Error "+ JSON.stringify(err));
  }
}

}
