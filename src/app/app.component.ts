import { Component, OnInit } from '@angular/core';
// import * as FireBase from 'firebase';
import { AuthService } from './components/shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.authAppInit();
    /*
    FireBase.initializeApp({
      apiKey: "AIzaSyCEC1Ow2CxYbbnoQIc6Q5ZqRdFFr1dD_iw",
      authDomain: "recipe-app-book-10012018.firebaseapp.com",
    });
    */
  }

}
