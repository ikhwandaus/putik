import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage implements OnInit {

  isAdmin

  constructor() { 

    //identify if user is admin
   firebase.auth().onAuthStateChanged(user => {
    if (user) {
      firebase.firestore().doc(`users/${user.uid}`).get().then(usersSnapshot => {
        this.isAdmin = usersSnapshot.data().isAdmin;
      });
     }
   });
  }

  ngOnInit() {
  }

}
