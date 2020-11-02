import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "angularfire2/firestore";
import { FirestoreService } from '../services/data/firestore.service';
import { AngularFireAuth } from 'angularfire2/auth'
import { Router } from '@angular/router';
import { User } from "../models/user"
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
// import { runInThisContext } from 'vm';

@Component({
  selector: 'app-edit-prof',
  templateUrl: './edit-prof.page.html',
  styleUrls: ['./edit-prof.page.scss'],
})
export class EditProfPage implements OnInit {

  userDocs: AngularFirestoreDocument
  userCollection: AngularFirestoreCollection
  user

  email: string
  userName: string
  icNo: number
  phoneNo: number
  address: string

  newUserEmail: string
  newUsername: string
  newIcNumber: string
  newPhoneNumber: string
  newUserAddress: string

  password
  newpassword: string

  currentUser = {} as User
  cred

  formStatus: boolean = true;


  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private userFs: FirestoreService,
    private router: Router,
    private alertController: AlertController,

  ) {
    // this.userDocs = afStore.doc(`users/${userFs.getUID()}`)
    //  ref & take data from firestore
    //  this.afAuth.authState.subscribe(data => {
    //  this.userDocs = afStore.doc(`users/${data.uid}`)
    //   this.user = this.userDocs.valueChanges().subscribe(item =>{
    //     this.userName = item.userName
    //     this.email =item.email
    //     this.icNo = item.icNo
    //     this.phoneNo = item.phoneNo
    //     this.address = item.address
    //     // this.password = item.password
    //   })
    // })
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    //  ref & take data from firestore
    this.afAuth.authState.subscribe(data => {
      this.userDocs = this.afStore.doc(`users/${data.uid}`)//get user UID

      this.user = this.userDocs.valueChanges().subscribe(item => {//set contents from users collection/docs to variables
        this.userName = item.userName
        this.email = item.email
        this.icNo = item.icNo
        this.phoneNo = item.phoneNo
        this.address = item.address
        //  this.password = item.password
      })
    })

    //  this.currentUser = firebase.auth().currentUser;
    //  this.cred = firebase.auth.EmailAuthProvider.credential(this.currentUser.email, this.password)
  }

  // item={}
  async editProfile(item) {

    // console.log(this.userFs.getUsername())
    // console.log(this.userFs.getIcNumber())
    // console.log(this.userFs.getAddress())
    // console.log(this.userFs.getPassword())
    // console.log(this.userFs.getPhoneNumber())
    this.formStatus = true;

    //Sensitive Data (password & email for authentication)
    if (this.password == undefined || this.password == "") {
      // this.busy = false
      // console.log("not working")
      // this.formStatus = false;
      return this.presentAlert('Error!', 'You have to enter your old password')
    }

    if(this.password != this.userFs.getPassword()){
      return this.presentAlert('Error!', 'Wrong password')
    }

    if (this.password != undefined && this.password == this.userFs.getPassword()) {

      // reauth
    
      const user = this.afAuth.auth.currentUser;
      const credentials = firebase.auth.EmailAuthProvider.credential(user.email, this.password);
      user.reauthenticateWithCredential(credentials).then(() => console.log('reauth ok'));

      if ((<HTMLInputElement>document.getElementById("newPassField")).value.length > 1){
        //new password
        if (this.newpassword != null && this.newpassword != this.password) {
          await this.userFs.updatePassword(this.newpassword);
          this.userDocs.update({
            password: this.newpassword
          })
          console.log("reached new Password")
        } 
      }

      

      //email
      // if(this.email !== this.userFs.getEmail(this.user)) {
      // 	await this.userFs.updateEmail(this.email)
      //   //update email in firestore
      //   this.userDocs.update({
      //     email: this.email
      // 	})
      // }
      //Sensitive Data (password & email for authentication)

      // if ((<HTMLInputElement>document.getElementById("icField")).value.length == 0) {
      //   console.log("works")
      // }

      //username
      if (this.userName == "") {
        this.formStatus = false;
      }

      //ic number
      if ((<HTMLInputElement>document.getElementById("icField")).value.length == 0){
        this.formStatus = false;
      }

      //phone number
      if ((<HTMLInputElement>document.getElementById("phoneField")).value.length == 0) {
        this.formStatus = false;
      }

      //address
      if (this.address == "") {
        this.formStatus = false;
      }

      //error empty field messages

      //username
      if (this.userName == "") {
        this.formStatus = false;
        this.presentAlert('Error!', 'You cannot leave the Username field blank');
      }

      // //ic number
      // if ((<HTMLInputElement>document.getElementById("icField")).value.length == 0) {
      //   this.formStatus = false;
      //   this.presentAlert('Error!', 'You cannot leave the IC number field blank');
      // }

      // //phone number
      // if ((<HTMLInputElement>document.getElementById("phoneField")).value.length == 0){
      //   this.formStatus = false;
      //   this.presentAlert('Error!', 'You cannot leave the Phone Number field blank');
      // }

      //address
      if (this.address == "") {
        this.formStatus = false;
        this.presentAlert('Error!', 'You cannot leave the Address field blank');
      }

      //length
      if((<HTMLInputElement>document.getElementById("icField")).value.length !== 8 &&
      (<HTMLInputElement>document.getElementById("icField")).value.length == 0){
        this.formStatus = false;
        this.presentAlert('Error!', 'IC number length must be 8 characters');
       }
       
       if((<HTMLInputElement>document.getElementById("phoneField")).value.length !== 7 && 
       (<HTMLInputElement>document.getElementById("phoneField")).value.length == 0){
        this.formStatus = false;
        this.presentAlert('Error!', 'phone number length must be 7 characters');
      }

       

       


      if (this.formStatus == true) {

        //update user details form
        this.userDocs.update({
          userName: this.userName,
          icNo: this.icNo,
          phoneNo: this.phoneNo,
          address: this.address
        })


        this.password = ""
        this.newpassword = ""

        await this.presentAlert('Saved!', 'Your profile was updated!')
        this.router.navigate(['/userprof'])
      }
    }

  }

  cancel() {
    // if unsaved changes happens
    if (this.userName == this.userFs.getUsername() && this.icNo == this.userFs.getIcNumber() && this.phoneNo == this.userFs.getPhoneNumber()
        && this.address == this.userFs.getAddress()) {
      this.router.navigate(['/userprof'])
    } else {
      return this.saveOrNotAlert('Wait!', 'Are you sure you want to leave and discard all the changes?')
    }
  }


  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    })

    await alert.present()
  }

  async saveOrNotAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: [{
        text: 'Discard',
        handler: () => {
          this.router.navigate(['/userprof'])
        }
      }, {
        text: 'Cancel',
        role: 'cancel'
        // handler: () =>{
        //    this.editProfile
        // }
      }
      ]
    })

    await alert.present()
  }

 




}
