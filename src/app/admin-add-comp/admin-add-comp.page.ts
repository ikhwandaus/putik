import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from "angularfire2/firestore";
import { FirestoreService } from '../services/data/firestore.service';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin-add-comp',
  templateUrl: './admin-add-comp.page.html',
  styleUrls: ['./admin-add-comp.page.scss'],
})
export class AdminAddCompPage implements OnInit {

  comps
  plansAr
  compNameId
  compName
  compAddress
  compNumber
  compAreas
  compId

  constructor(
    private route: ActivatedRoute,
    private afStore: AngularFirestore,
    private firestoreService: FirestoreService,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
  }

  addCompany(){

    this.afStore.doc(`companies/${this.compId}`).set({
      displayName: this.compName,
      address: this.compAddress,
      phoneNo: this.compNumber,
      eAreas: this.compAreas,
      id: this.compId
      });

      this.presentAlert('Saved!', 'Company Added')

      this.compName = "";
      this.compAddress = "";
      this.compNumber = "";
      this.compAreas = "";
      this.compId = "";
  }

  async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
  }

  async logout(): Promise<void> {
    await this.firestoreService.logout();
    // this.router.navigateByUrl('lo');
   }


}
