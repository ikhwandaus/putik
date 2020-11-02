import { Component, OnInit } from '@angular/core';
import { User } from "../models/user"
import { AngularFireAuth } from 'angularfire2/auth'
// import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore,AngularFirestoreCollection } from "angularfire2/firestore";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Router, RouterLink } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormBuilder, Validators } from "@angular/forms";
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';


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

  formStatus: boolean = true;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router,
    public toastController: ToastController,
    private formBuilder: FormBuilder,
    public modalController: ModalController,

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
  this.formStatus = true;
  
  if(value.userName == undefined || value.userName == ""){
   let err = "please enter a username";
   this.failToastForm(err);
   this.formStatus = false;
  }

  if(value.address == undefined || value.address == ""){
    let err = "please enter an address";
    this.failToastForm(err);
    this.formStatus = false;
   }

   if(value.phoneNo == undefined || value.phoneNo == ""){
    let err = "please enter a phone number";
    this.failToastForm(err);
    this.formStatus = false;
   }

   if(value.icNo == undefined || value.icNo == ""){
    let err = "please enter your IC number";
    this.failToastForm(err);
    this.formStatus = false;
   }

   //length
   if((<HTMLInputElement>document.getElementById("icField")).value.length !== 8){
    let err = "IC number length must be 8 characters";
    this.failToastForm(err);
    this.formStatus = false;
   }

   if((<HTMLInputElement>document.getElementById("phoneField")).value.length !== 7){
    let err = "phone number length must be 7 characters";
    this.failToastForm(err);
    this.formStatus = false;
   }

  if(this.formStatus == true){
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
            icNo: value.icNo,
            plans: "",
            isAdmin: false,
            subscribeTo: "",
            subscribed: false
          };
        this.userCollection.doc(res.user.uid).set(user);//creates user in firestore
          resolve(res);
          this.router.navigate(['/homepage']);
          this.successToast();
        }, err => {
          // rejects(err);
          // console.log(err.message)
          this.failToast(err.message);
        }
      )
    })
  } 
}

goToLogin(){
  this.presentModal();
  this.router.navigate(['/homepage'])
}

async presentModal() {
  const modal = await this.modalController.create({
    component: LoginPage,
    componentProps: { value: 123 }
  });
  return await modal.present();
}

async successToast() {
  const toast = await this.toastController.create({
    message: 'Sign Up Success',
    duration: 2000
  });
  toast.present();
}

async failToast(error) {
  const toast = await this.toastController.create({
    // message: 'Sign Up Failed, Email is already taken',
    message: 'Sign up failed: '+ error,

    duration: 2000
  });
  toast.present();
}

async failToastForm(error) {
  const toast = await this.toastController.create({
    // message: 'Sign Up Failed, Email is already taken',
    message: 'Sign up failed: '+ error,

    duration: 2000
  });
  toast.present();
}


  ngOnInit() {
  }
  



}
