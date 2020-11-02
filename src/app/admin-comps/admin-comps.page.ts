import { Component, OnInit } from '@angular/core';

import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { FirestoreService } from '../services/data/firestore.service';


@Component({
  selector: 'app-admin-comps',
  templateUrl: './admin-comps.page.html',
  styleUrls: ['./admin-comps.page.scss'],
})
export class AdminCompsPage implements OnInit {

  displayName: any; 
  isAdmin;

  itemsCollection: AngularFirestoreCollection<any>; //firestore collection
  items: Observable<any[]> //read collection

  constructor(
    private afStore: AngularFirestore,
    private firestoreService: FirestoreService,

  ) {
  //     //identify if user is admin
  //  firebase.auth().onAuthStateChanged(user => {
  //   if (user) {
  //     firebase.firestore().doc(`users/${user.uid}`).get().then(usersSnapshot => {
  //       this.isAdmin = usersSnapshot.data().isAdmin;
  //     });
  //    }
  //  });
   }

  ionViewWillEnter(){
    this.itemsCollection = this.afStore.collection('companies'); //ref
    this.items = this.itemsCollection.valueChanges(); 
    console.log(this.items)
  }

  ngOnInit() {
  }

  async logout(): Promise<void> {
    await this.firestoreService.logout();
    // this.router.navigateByUrl('lo');
   }

}
