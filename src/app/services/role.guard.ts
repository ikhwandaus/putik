import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';


import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from "angularfire2/firestore";


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  
  isAdmin: boolean;

  userDocs: AngularFirestoreDocument;
  user
  userRole: boolean

  found: boolean = false;

  
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private alertController: AlertController,

  ){
    

   

  }
  
  ngOnInit(){
      
  }
  
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      
      return new Promise((resolve, rejects) => {
        firebase.auth().onAuthStateChanged(user => {
          this.user = user
          firebase.firestore().doc(`users/${user.uid}`).get().then(usersSnapshot => {
            this.isAdmin = usersSnapshot.data().isAdmin;
            console.log(this.isAdmin)
         })       
        });
        setTimeout(() =>{
          if(this.isAdmin == true){
            resolve(true);
          } else {
            console.log('no access');
            this.router.navigate(['/homepage']);
            // this.presentModal();
            rejects('no access')
            this.presentAlert('Error!', 'You do not have access to this page') 
            resolve(false);
          }
        }, 1000)
         
      })




    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     firebase.firestore().doc(`users/${user.uid}`).get().then(usersSnapshot => {
    //       this.isAdmin = usersSnapshot.data().isAdmin;
    //       // console.log(this.isAdmin)
    //       if(this.isAdmin ==  true){
    //         console.log(this.isAdmin)
    //         // this.found = true;
    //         return true;
    
    //       } else if(this.isAdmin == undefined){
            
    //         firebase.auth().onAuthStateChanged(user => {
    //           if (user) {
    //             firebase.firestore().doc(`users/${user.uid}`).get().then(usersSnapshot => {
    //               this.isAdmin = usersSnapshot.data().isAdmin;
    //               console.log(this.isAdmin)
    //             })
    //            }
    //          })
    //         //  this.found = true;
    //       }else{
    //         console.log(this.isAdmin)
    //         this.presentAlert('Error!', 'You do not have access to this page') 
    //         // this.found = true;
    //         return this.router.parseUrl('/homepage');
    //       }
    //     });
    //    }       
    //  })
     
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
