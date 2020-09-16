import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from "angularfire2/firestore";
import { FirestoreService } from '../services/data/firestore.service';

import { ModalController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
  // public comp: Observable<any>;

  constructor(
    private afStore: AngularFirestore,
    private firestoreService: FirestoreService,
    public modalController: ModalController
  ) { }

  ngOnInit() {

    // this.comp = this.firestoreService.getUID()
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: LoginPage,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }

  closeModal()
  {
    this.modalController.dismiss();
  }

}
