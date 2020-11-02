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
import * as firebase from 'firebase';
import { AlertController } from '@ionic/angular';

import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

user = {} as User;
isAdmin


// email: string = ""
// password: string = "" 

// validations_form: FormGroup;
// errorMessage: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    public toastController: ToastController,
    private router: Router,
    public modalController: ModalController,
    private alertController: AlertController,
    private formBuilder: FormBuilder

    // private navCtrl: NavController,
    // private authService: AuthenticationService,
    // private formBuilder: FormBuilder

    // public authService: AuthenticationService, public router: Router
   // public afAuth: AngularFireAuthModule
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.firestore().doc(`/users/${user.uid}`).get().then(usersSnapshot => {
            this.isAdmin = usersSnapshot.data().isAdmin;
          });
      }
    });
  }


  async login(user: User){
    
    const result =  this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      
    try{
      console.log(result);
      if((await result).additionalUserInfo){
        // this.router.navigate(['/homepage']);
        this.successToast();
        // if(user.isAdmin == true){
        //   this.router.navigate(['/receipts']);
        // }
        this.closeModal();
       
       
      }
      
    }
    catch(e){
      // this.presentAlert('Email Sent!', e)
      console.log(e.message);
      this.failToast(e.message);
      
    }
  }

  async successToast() {
    const toast = await this.toastController.create({
      message: 'Logged In',
      duration: 2000
    });
    toast.present();
  }

  async failToast(error) {

    switch (error) {
      case "There is no user record corresponding to this identifier. The user may have been deleted.":
        const toast = await this.toastController.create({
          message: 'Wrong Combination of Email & Password',
          duration: 2000
        });
        toast.present();
        break;
      case "The email address is badly formatted.":
        const toast1 = await this.toastController.create({
          message: 'Please Enter a Valid Email',
          duration: 2000
        });
        toast1.present();
        break;
      case "The password is invalid or the user does not have a password.":
        const toast2 = await this.toastController.create({
          message: 'Wrong Password',
          duration: 2000
        });
        toast2.present();
        break;
      default:
        break;
    }  
  }

  
  closeModal()
  {
    this.modalController.dismiss();
    // window.location.reload();
    
  }

  goToSignUp(){
    this.closeModal()
    this.router.navigate(['/signup'])
  }


  resetPassword(user: User) {
    // this.auth.resetPassword(email)
    if(user.email == null){
      return this.presentAlert('ay hold up!', 'Please enter your account email in the field')
    }else{
      this.sendPassword(user.email)
    }
   
  }

  sendPassword(email: string) {
      var auth = firebase.auth();
      return auth.sendPasswordResetEmail(email)
        .then(() => this.presentAlert('Email Sent!', 'An email has been sent to reset your password'))
        .catch((error) => console.log(error))
    
    
  }

  async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
  }

  


  
 
  public errorMessages = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid email address' }

      
    ],
    password: [
      { type: 'required', message: 'Name is required' },
      { type: 'maxlength', message: 'Name cant be longer than 20 characters' }
    ]
  }

  loginForm = this.formBuilder.group({
    email: ['',[Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')
      ]
    ],
    password: ['', [Validators.required, Validators.maxLength(20)]]
  });

}
