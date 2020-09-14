import { Component, OnInit } from '@angular/core';
import { User } from "../models/user"
import { AngularFireAuth } from 'angularfire2/auth'
// import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore,AngularFirestoreCollection } from "angularfire2/firestore";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { rejects } from 'assert';
// import { auth } from 'firebase';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  user = {} as User;
  
  //2nd method
  userCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;


  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router,
    public toastController: ToastController
  ) { 
    //2nd method
    this.userCollection = afStore.collection<User> ('users');
    this.users = this.userCollection.snapshotChanges().pipe(
      map (actions => {
        return actions.map (a => {
          const data = a.payload.doc.data();
          const id  = a.payload.doc.id;
          return {id, ... data};
        })
      })
    )
    
  }

//  async signup(user: User){
//    try{
//     const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    
//     console.log(result);
//    }
//    catch(e){
//      console.error(e); 
//    }

//   }

//method 2
value = {};
async signup(value){
  
  return new Promise<any> ((resolve,rejects) =>{
    this.afAuth.auth.createUserWithEmailAndPassword(value.email,value.password).then(
      res => {
        console.log("User id after registration = "+res.user.uid);
        let user: User = {
          email: value.email,
          id: res.user.uid,
          password:value.password,
          userName: value.userName,
          address: value.address,
          phoneNo: value.phoneNo,
          icNo: value.icNo
        };
       this.userCollection.doc(res.user.uid).set(user);
        resolve(res);
        this.router.navigate(['/homepage']);
        this.successToast();
      }, err => {
        rejects(err);
        this.failToast();
      }
    )
  })
  
}

async successToast() {
  const toast = await this.toastController.create({
    message: 'Sign Up Success',
    duration: 2000
  });
  toast.present();
}

async failToast() {
  const toast = await this.toastController.create({
    message: 'Sign Up Failed, Email is already taken',
    duration: 2000
  });
  toast.present();
}

  ngOnInit() {
  }
  



}
