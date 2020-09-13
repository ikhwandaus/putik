import { Component, OnInit } from '@angular/core';
import { User } from "../models/user"
import { AngularFireAuth } from 'angularfire2/auth'
// import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore,AngularFirestoreCollection } from "angularfire2/firestore";
// import { auth } from 'firebase';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  user = {} as User;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore
  ) { }

 async signup(user: User){
   try{
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    
    console.log(result);
   }
   catch(e){
     console.error(e); 
   }

  }

  ngOnInit() {
  }



}
