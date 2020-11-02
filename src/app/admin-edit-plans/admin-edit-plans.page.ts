import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from "angularfire2/firestore";
import { FirestoreService } from '../services/data/firestore.service';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-edit-plans',
  templateUrl: './admin-edit-plans.page.html',
  styleUrls: ['./admin-edit-plans.page.scss'],
})
export class AdminEditPlansPage implements OnInit {

  compCollection: AngularFirestoreDocument<any>;
  comps

  planCollection: AngularFirestoreDocument<any>;
  plans
  plansAr
  planPrice
  planDescr
  planDetails
  compName
  planEdit
  
  constructor(
    private route: ActivatedRoute,
    private afStore: AngularFirestore,
    private firestoreService: FirestoreService,
    private alertController: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    
    const compId: string = this.route.snapshot.paramMap.get('id'); //get comp id
    const planId: string = this.route.snapshot.paramMap.get('idPlan'); //get plan id

    this.compCollection = this.afStore.doc(`companies/${compId}`)
     this.comps = this.compCollection.valueChanges().subscribe(item =>{
     this.compName = item.displayName
     })

    this.planCollection = this.afStore.doc('/companies/'+compId +`/plans/${planId}`)
    this.plans = this.planCollection.valueChanges().subscribe(item =>{
      this.planPrice = item.price
      this.planDescr = item.descr
      this.planDetails = item.detailArray
      // this.compName = item.compName
   })
  }

  editPlan(){
    const compId: string = this.route.snapshot.paramMap.get('id'); //get comp id

     //change price, desc,
     this.planCollection.update({
      price: this.planPrice,
      descr: this.planDescr,
      detailArray: this.planDetails
     })

     this.presentAlert('Saved!', 'Plan details has been saved')
     this.router.navigate(['/admin-comp-profile/'+compId])
  }

  deletePlan(){
    // const compId: string = this.route.snapshot.paramMap.get('id'); //get comp id
    // const planId: string = this.route.snapshot.paramMap.get('idPlan'); //get plan id

    return this.saveOrNotAlert('Wait!', 'Are you sure you want to delete this ' + this.compName + "'s Plan?" )

    // this.afStore.collection('companies/'+compId+'/plans/').doc(planId).delete();
    // this.presentAlert('Saved!', 'The plan has been deleted')
    // this.router.navigate(['/admin-comp-profile/'+compId])
  }

  async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
  }

  async saveOrNotAlert(title: string, content: string) {
    const compId: string = this.route.snapshot.paramMap.get('id'); //get comp id
    const planId: string = this.route.snapshot.paramMap.get('idPlan'); //get plan id

		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: [{
        text: 'Yes',
        handler: () =>{
          this.afStore.collection('companies/'+compId+'/plans/').doc(planId).delete();
           this.router.navigate(['/admin-comp-profile/'+compId])
        }
      },{
        text: 'Cancel',
        role: 'cancel'
      }
      ]
		})

		await alert.present()
  }

  async logout(): Promise<void> {
    await this.firestoreService.logout();
    // this.router.navigateByUrl('lo');
   }


}
