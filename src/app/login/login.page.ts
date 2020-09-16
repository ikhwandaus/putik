import { Component, OnInit } from '@angular/core';
// import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
// import { Router } from '@angular/router';
// import { auth } from 'firebase/app'
// import { from } from 'rxjs';
// import { AuthenticationService } from 'src/shared/authentication-service';
// import { AuthenticationService } from '../services/authentication.service';
// import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
// import { NavController } from '@ionic/angular';

import { User } from "../models/user"
import { AngularFireAuth } from 'angularfire2/auth'
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

user = {} as User;


// email: string = ""
// password: string = "" 

// validations_form: FormGroup;
// errorMessage: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    public toastController: ToastController,
    private router: Router,
    public modalController: ModalController

    // private navCtrl: NavController,
    // private authService: AuthenticationService,
    // private formBuilder: FormBuilder

    // public authService: AuthenticationService, public router: Router
   // public afAuth: AngularFireAuthModule
  ) { }

  async login(user: User){
    
    const result =  this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      
    try{
      console.log(result);
      if((await result).additionalUserInfo){
        this.router.navigate(['/homepage']);
        this.successToast();
        this.closeModal();
      }
    }
    catch(e){
      console.error(e);
      this.failToast();
    }
  }

  async successToast() {
    const toast = await this.toastController.create({
      message: 'Logged In',
      duration: 2000
    });
    toast.present();
  }

  async failToast() {
    const toast = await this.toastController.create({
      message: 'Log In Failed',
      duration: 2000
    });
    toast.present();
  }

  closeModal()
  {
    this.modalController.dismiss();
  }


  ngOnInit() {

 

  }

 



 

  // async login(){
  //   const { username, password } = this
  //   try {
  //         const res = await this.afAuth.auth.(username, password)
  //   } catch (error) {
  //       console.dir(error)
  //   }
  // }

  // login(email, password) {
  //   this.authService.SignIn(email.value, password.value)
  //     .then((res) => {
  //       if(this.authService.isEmailVerified) {
  //         this.router.navigate(['homepage']);          
  //       } else {
  //         window.alert('Email is not verified')
  //         return false;
  //       }
  //     }).catch((error) => {
  //       window.alert(error.message)
  //     })
  // }

}
