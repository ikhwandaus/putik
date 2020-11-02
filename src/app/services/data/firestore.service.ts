import { Injectable } from '@angular/core';
// import { getLocaleDayNames } from '@angular/common';
// import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFirestore } from 'angularfire2/firestore';
import { firestore } from 'firebase';
// import { User } from 'src/app/models/user';
import { User } from "../../models/user";
import { AngularFireAuth } from "angularfire2/auth";
import { auth } from "firebase/app";
import * as firebase from 'firebase';

// interface User{
//   email: string;
//   uid: string;
// }


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  userDocs: AngularFirestoreDocument

  userMod: User;
  userFs
  userNameFs
  userEmailFs
  userIcFs
  userPhoneFs
  userAddrFs
  userPassFs
  
  

  constructor(
    public afStore: AngularFirestore,
    private afAuth: AngularFireAuth,
    ) { 

      this.afAuth.authState.subscribe(data => {

        try {
          this.userDocs = this.afStore.doc(`users/${data.uid}`)//get user UID
        } catch (error) {
          console.log('logged out')
        }
       
  
        try {
          this.userFs = this.userDocs.valueChanges().subscribe(item =>{//set contents from users collection/docs to variables
         
            this.userNameFs = item.userName
            this.userEmailFs =item.email
            this.userIcFs = item.icNo
            this.userPhoneFs = item.phoneNo
            this.userAddrFs = item.address
            this.userPassFs = item.password
    
          })
        } catch (error) {
          console.log('user logged out')
        }
        

      })

      
    }


  // getName(): AngularFirestoreCollection{
  //   return this.afStore.collection('companies');
  // }

  getCompDetail(compId: string): AngularFirestoreDocument<any> {
    return this.afStore.collection('companies').doc(compId);
  }

  setUser(user: User){
    this.userMod = user;
  }

  logout(): Promise<void> {
    return this.afAuth.auth.signOut();
    }

  // getUID(){
  //   const user = this.afAuth.auth.currentUser
  //   return user.uid

  //   // if(!this.user){
  //   //   if(this.afAuth.auth.currentUser){
  //   //     const user = this.afAuth.auth.currentUser
  //   //     this.setUser({
  //   //       email: user.email,
  //   //       id: user.uid,
  //   //       password: user.;
  //   //       userName: string;
  //   //       address: string;
  //   //       phoneNo: number;
  //   //       icNo: number;
  //   //     })
  //   //   }
  //   // }
  // }

  getUsername() {
    // console.log(user.userName);
    return this.userNameFs;
  }
  
  getEmail(user: User): string {
    // return this.user.email
    // console.log(firebase.auth().currentUser.email)
    return firebase.auth().currentUser.email;
    
    // return user.email
    
  }

  getIcNumber(){
    return this.userIcFs
  }

  getPhoneNumber(){
    return this.userPhoneFs
  }

  getAddress(){
    return this.userAddrFs
  }

  // getUID(): string {
	// 	return this.userMod.id
  // }

  getPassword(){
    return this.userPassFs
  }
  
  

  //weird auth import (beware) [changed to email also]
  reAuth(email: string, password: string) {
		return this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(email, password))
  }
  
  updatePassword(newpassword: string) {
    console.log("reached updatePassword in firestore service")
    return this.afAuth.auth.currentUser.updatePassword(newpassword)
    
  }

  updateEmail(newemail: string) {
		return this.afAuth.auth.currentUser.updateEmail(newemail)
  }
  
  // updateProfile(users) {
  //   return this.afStore.collection('users').doc(users.id).set(users, {merge: true});
  // }

  // updateProfile(recordID, record) {
  //   this.afStore.doc('users' + '/' + recordID).update(record);
  // }


  


  
}




