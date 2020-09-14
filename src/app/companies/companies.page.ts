import { Component, OnInit } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
// import { FirestoreService } from '../services/data/firestore.service';
import { Observable } from 'rxjs';
import { AngularFirestore,AngularFirestoreCollection } from 'angularfire2/firestore';

// import * as firebase from 'firebase';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.page.html',
  styleUrls: ['./companies.page.scss'],
})

// interface Name{
//     name: string
// }
export class CompaniesPage implements OnInit {
  
  displayName: any; 

  itemsCollection: AngularFirestoreCollection<any>; //firestore collection
  items: Observable<any[]> //read collection



  // displayName: Observable<Name[]>;
  // displayNameRef: AngularFirestoreCollection<Name>;
  // afs: any;

  constructor(private afStore: AngularFirestore) { 
    // this.displayNameRef = this.afs.collection('displayName');
    // this.displayName = this.displayNameRef.valueChanges();


   }

   ionViewWillEnter(){
    this.itemsCollection = this.afStore.collection('companies'); //ref
    this.items = this.itemsCollection.valueChanges(); 
    console.log(this.items)
  }

  ngOnInit() {
    // this.displayName = this.firestoreService.getName().valueChanges();
  }

  // getName(compName: string){
  //   return firebase.firestore().collection("companies").doc(compName).get();
  // }

}
