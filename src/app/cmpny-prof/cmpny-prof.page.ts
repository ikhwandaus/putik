import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from "angularfire2/firestore";
import { FirestoreService } from '../services/data/firestore.service';
import { Plan } from "../models/plans"
// import { map } from 'rxjs/internal/operators/map';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cmpny-prof',
  templateUrl: './cmpny-prof.page.html',
  styleUrls: ['./cmpny-prof.page.scss'],
})
export class CmpnyProfPage implements OnInit {

  compCollection: AngularFirestoreDocument<any>;
  public comp: Observable<any>;
  
  comps
  plansAr
  compNameId
  profilePic: String;

  planCollection: AngularFirestoreCollection<any>;
  public plan: Observable<any>

  // public plans: Observable<any>

  planSub
  plans: Observable<any[]>


  sliderConfig ={
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 1.6
  }

  constructor(
    private route: ActivatedRoute,
    private afStore: AngularFirestore,
    private firestoreService: FirestoreService,
  ) { }

  ngOnInit() {
    const compId: string = this.route.snapshot.paramMap.get('id'); //get id
    this.comp = this.firestoreService.getCompDetail(compId).valueChanges(); //reference

    //for plansArray in `companies
     this.compCollection = this.afStore.doc(`companies/${compId}`)
     this.comps = this.compCollection.valueChanges().subscribe(item =>{
    //  this.plansAr = item.plansArray

     //for company id collection
     this.compNameId = item.id
     
     try {
      this.profilePic = item.profilePic.file;
     } catch (error) {
       console.log()
     }
     
     
     
     })

      //use plans subcollections
      this.planSub = this.afStore.collection('companies/'+compId+'/plans');
      this.plans = this.planSub.valueChanges(); 
        
  }

  



}
