import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from "angularfire2/firestore";
import { FirestoreService } from '../services/data/firestore.service';
import { Plan } from "../models/plans"

@Component({
  selector: 'app-cmpny-prof',
  templateUrl: './cmpny-prof.page.html',
  styleUrls: ['./cmpny-prof.page.scss'],
})
export class CmpnyProfPage implements OnInit {

  compCollection: AngularFirestoreDocument<any>;
  public comp: Observable<any>;

  planCollection: AngularFirestoreCollection<any>;
  public plan: Observable<any>

  constructor(
    private route: ActivatedRoute,
    private afStore: AngularFirestore,
    private firestoreService: FirestoreService,
  ) { }

  ngOnInit() {
    const compId: string = this.route.snapshot.paramMap.get('id');
    this.comp = this.firestoreService.getCompDetail(compId).valueChanges();

    this.planCollection = this.afStore.collection('companies').doc(compId).collection<Plan>('plans');
    this.plan = this.planCollection.valueChanges();
  }

  



}
