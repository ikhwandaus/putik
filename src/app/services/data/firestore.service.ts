import { Injectable } from '@angular/core';
// import { getLocaleDayNames } from '@angular/common';
// import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFirestore } from 'angularfire2/firestore';
import { firestore } from 'firebase';
// import { User } from 'src/app/models/user';
import { User } from "../../models/user";
import { AngularFireAuth } from "angularfire2/auth";

// interface User{
//   email: string;
//   uid: string;
// }


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private user: User;

  constructor(
    public afStore: AngularFirestore,
    private afAuth: AngularFireAuth,
    ) { }


  // getName(): AngularFirestoreCollection{
  //   return this.afStore.collection('companies');
  // }

  getCompDetail(compId: string): AngularFirestoreDocument<any> {
    return this.afStore.collection('companies').doc(compId);
  }

  setUser(user: User){
    this.user = user;
  }

  getUID(){
    const user = this.afAuth.auth.currentUser
    return user.uid

    // if(!this.user){
    //   if(this.afAuth.auth.currentUser){
    //     const user = this.afAuth.auth.currentUser
    //     this.setUser({
    //       email: user.email,
    //       id: user.uid,
    //       password: user.;
    //       userName: string;
    //       address: string;
    //       phoneNo: number;
    //       icNo: number;
    //     })
    //   }
    // }
  }


  
}




