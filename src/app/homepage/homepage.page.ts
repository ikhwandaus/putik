import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from "angularfire2/firestore";
import { FirestoreService } from '../services/data/firestore.service';
import { AngularFireAuth } from 'angularfire2/auth'

import { ModalController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { LoginPage } from '../login/login.page';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
  // public comp: Observable<any>;

  // userCollection: AngularFirestoreCollection<User>;
  // users: Observable<any>

  userDocs: AngularFirestoreDocument
  user
  username
  isAdmin
  userRole

  currentUser : any;
  loggedIn    : boolean = true;
  showBtn     : boolean = true;

  hasVerifiedEmail = true;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private firestoreService: FirestoreService,
    public modalController: ModalController,
    private router: Router,
    private alertController: AlertController,
    public toastController: ToastController,

    )  
    
    {
    // this.loggedIn = true;
     this.afAuth.authState.subscribe(user => {
       if(user){
         this.hasVerifiedEmail = this.afAuth.auth.currentUser.emailVerified;
         
       }
     });
   }

   ionViewWillEnter(){
    this.loggedIn = true;
    this.username = "User";
    this.currentUser = this.afAuth.auth.currentUser;
      
        this.afAuth.authState.subscribe(data => {
          try {
            this.loggedIn = true;
            this.userDocs = this.afStore.doc(`users/${data.uid}`)
            this.user = this.userDocs.valueChanges().subscribe(item =>{
              this.username = item.userName
              
            })
          } catch (error) {
            this.hasVerifiedEmail = true;
            this.loggedIn = false;
            this.username = "User";
            console.log('logged out')
          }
        
        })
      
   }

  public ngOnInit() {

    this.currentUser = this.afAuth.auth.currentUser;
    if(this.currentUser === null){
    //  this.showBtn = false;
     this.loggedIn = false;
      }

      
  //identify if user is admin
   firebase.auth().onAuthStateChanged(user => {
     if (user) {
       firebase.firestore().doc(`users/${user.uid}`).get().then(usersSnapshot => {
         this.isAdmin = usersSnapshot.data().isAdmin;
       });
      }
    });
  }

  async logOut(): Promise<void> {
    await this.firestoreService.logout();
    // this.router.navigateByUrl('lo');
        // window.location.reload();
    const toast = await this.toastController.create({
      message: 'Logged Out',
      duration: 2000
    });
        toast.present();
   }

   logIn(){
    // this.router.navigateByUrl('login');
    this.presentModal();
    // if(){

    // }
   }

 

  async presentModal() {
    const modal = await this.modalController.create({
      component: LoginPage,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }

  // closeModal()
  // {
  //   this.modalController.dismiss();
  // }

  sendVerificationEmail(){
    this.afAuth.auth.currentUser.sendEmailVerification();
    this.presentAlert('Please Check Your Email', 'A verification link has been sent to your email')
  }

  refreshPage(){
    window.location.reload();
  }

  async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
  }
}
