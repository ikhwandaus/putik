import { Injectable } from '@angular/core';
// import { getLocaleDayNames } from '@angular/common';
// import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFirestore } from 'angularfire2/firestore';
import { firestore } from 'firebase';



@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore) { }


  getName(): AngularFirestoreCollection{
    return this.firestore.collection('companies');
  }
  
}




