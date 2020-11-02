import { Component, OnInit } from '@angular/core';

import { FirestoreService } from '../services/data/firestore.service';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from "angularfire2/firestore";
import { AngularFireAuth } from 'angularfire2/auth'
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { firestore } from 'firebase/app';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-rate',
  templateUrl: './rate.page.html',
  styleUrls: ['./rate.page.scss'],
})
export class RatePage implements OnInit {

  title: string
  review: string

  userDocs: AngularFirestoreDocument
  user
  userName
  docId



  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private userFs: FirestoreService,
    private router: Router,
    private toastController: ToastController,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    //  ref & take data from firestore
    this.afAuth.authState.subscribe(data => {

    try {
      this.userDocs = this.afStore.doc(`users/${data.uid}`)//get current user UID
    } catch (error) {
      console.log()
    }  
     
      this.user = this.userDocs.valueChanges().subscribe(item =>{//set contents from users collection/docs to variables
        this.userName = item.userName 
      })
    })
 }

 newDocRef
 async createReview(){
    // const title = this.title
    // const review = this.review

    const compId: string = this.route.snapshot.paramMap.get('id'); //get comp id


    //subcollection method
    const id = this.afStore.createId();//generate doc id
     this.afStore.doc('companies/' + compId + `/reviews/${id}`).set({
      title: this.title,
      review: this.review,
      userName: this.userName,
      id: id
      });

    this.title = ""
    this.review= ""

    this.successToast()

    
  }

  async successToast() {
    const toast = await this.toastController.create({
      message: 'Review Posted!',
      duration: 2000
    });
    toast.present();
  }

}
