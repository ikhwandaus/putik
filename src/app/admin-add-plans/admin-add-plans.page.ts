import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from "angularfire2/firestore";
import { FirestoreService } from '../services/data/firestore.service';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { firestore } from 'firebase';

@Component({
  selector: 'app-admin-add-plans',
  templateUrl: './admin-add-plans.page.html',
  styleUrls: ['./admin-add-plans.page.scss'],
})
export class AdminAddPlansPage implements OnInit {
  
  planId
  planDescr
  planPrice: number;
  compName
  planDetails

  compCollection: AngularFirestoreDocument<any>;
  comps

  detailArr
  detailArr2
  detailArr3
  detailArr4
  detailArr5


  constructor(
    private route: ActivatedRoute,
    private afStore: AngularFirestore,
    private firestoreService: FirestoreService,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    const compId: string = this.route.snapshot.paramMap.get('id'); //get id

    
    this.compCollection = this.afStore.doc(`companies/${compId}`)
    this.comps = this.compCollection.valueChanges().subscribe(item =>{
    this.compName = item.displayName  
    })
  }

  addPlan(){
    const compId: string = this.route.snapshot.paramMap.get('id'); //get id
    
    const arrDetails: string = this.detailArr
    const arrDetails2: string = this.detailArr2
    const arrDetails3: string = this.detailArr3
    const arrDetails4: string = this.detailArr4
    const arrDetails5: string = this.detailArr5



    this.afStore.doc('companies/' + compId + `/plans/${this.planId}`).set({
      id: this.planId,
      descr: this.planDescr,
      price: this.planPrice,
      compName: this.compName,
      // subDetails: this.planDetails
      });

       this.afStore.doc('companies/' + compId + `/plans/${this.planId}`).update({
      detailArray: firestore.FieldValue.arrayUnion(
        this.detailArr, 
        this.detailArr2, 
        this.detailArr3,
        this.detailArr4,
        this.detailArr5
        )
    })
   
      this.presentAlert('Saved!', 'Company Plan Added')
      
      this.planId = ""
      this.planDescr= ""
      this.planPrice = null
      this.planDetails = ""

      this.router.navigate(['/admin-comp-profile/'+compId])

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
