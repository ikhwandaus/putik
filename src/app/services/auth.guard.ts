import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from 'angularfire2/auth';
import { CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { rejects } from 'assert';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { LoginPage } from '../login/login.page';
import { ModalController } from '@ionic/angular';
import { UserprofPage } from '../userprof/userprof.page';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
// , CanActivateChild, CanDeactivate<unknown>, CanLoad
export class AuthGuard implements CanActivate {

  userD: User;
  isAdmin;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    public modalController: ModalController
  ){}

  ngOnInit(){
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.firestore().doc(`/users/${user.uid}`).get().then(usersSnapshot => {
            this.isAdmin = usersSnapshot.data().isAdmin;
          });
      }
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, rejects) => {
      firebase.auth().onAuthStateChanged((user: firebase.User) =>{
        if(user){
          resolve(true);
        } else {
          console.log('User is not logged in');
          // this.router.navigate(['/login']);
          this.presentModal();
          // rejects('no user logged in')
          resolve(false);
        }
     
      })
    })
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: LoginPage,
      componentProps: { value: 123 }
      
    });
    return await modal.present();
  }

 

  // canActivateChild(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  // canDeactivate(
  //   component: unknown,
  //   currentRoute: ActivatedRouteSnapshot,
  //   currentState: RouterStateSnapshot,
  //   nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  // canLoad(
  //   route: Route,
  //   segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
  //   return true;
  // }
}
