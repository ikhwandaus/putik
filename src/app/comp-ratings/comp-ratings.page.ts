import { Component, OnInit } from '@angular/core';

import { FirestoreService } from '../services/data/firestore.service';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from "angularfire2/firestore";
import { AngularFireAuth } from 'angularfire2/auth'
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { firestore } from 'firebase/app';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comp-ratings',
  templateUrl: './comp-ratings.page.html',
  styleUrls: ['./comp-ratings.page.scss'],
})
export class CompRatingsPage implements OnInit {

  reviewCollection: AngularFirestoreDocument<any>;
  rev
  revArr

  reviewSub
  items: Observable<any[]>

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private userFs: FirestoreService,
    private router: Router,
    private toastController: ToastController,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const compId: string = this.route.snapshot.paramMap.get('id'); //get plan id

    // //for reviews array in `reviews`
    // this.reviewCollection = this.afStore.doc(`reviews/${compId}`)
    // this.rev = this.reviewCollection.valueChanges().subscribe(item =>{
    // this.revArr = item.reviews
    // })

     //use subcollections
    this.reviewSub = this.afStore.collection('companies/'+compId+'/reviews');
    this.items = this.reviewSub.valueChanges(); 
    console.log(this.items)
  }

}
