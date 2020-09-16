import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
// import { rejects } from 'assert';
// import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    // private afAuth: AngularFireAuth
  ) { }

  // loginUser(value){
  //   return new Promise<any>((resolve, reject) => {
  //     this.afAuth.signInWithEmailAndPassword(value.email, value.password)
  //     .then(
  //       res => resolve(res),
  //       err => reject(err))
  //   })
  // }
}
