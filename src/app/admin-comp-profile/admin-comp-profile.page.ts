import { Component, IterableDiffers, OnInit, ViewChild } from '@angular/core';

import { concat, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from "angularfire2/firestore";
import { FirestoreService } from '../services/data/firestore.service';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { isNgTemplate } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-admin-comp-profile',
  templateUrl: './admin-comp-profile.page.html',
  styleUrls: ['./admin-comp-profile.page.scss'],
})
export class AdminCompProfilePage implements OnInit {

  compCollection: AngularFirestoreDocument<any>;

  comps
  plansAr
  compNameId
  compName
  compAddress
  compNumber
  compAreas
  profilePic: string

  reviewCollection: AngularFirestoreDocument<any>;
  rev
  revArr
  userNrev

  reviewSub
  userSubs
  subscriber
  userDocs
  user

  items: Observable<any[]>

  planSub
  plans: Observable<any[]>

  @ViewChild('fileBtn') fileBtn: {
		nativeElement: HTMLInputElement
	}

  constructor(
    private route: ActivatedRoute,
    private afStore: AngularFirestore,
    private firestoreService: FirestoreService,
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    private router: Router,
    private http: HttpClient, 

  ) { 
    const compId: string = this.route.snapshot.paramMap.get('id'); //get id
    this.compCollection = this.afStore.doc(`companies/${compId}`)
    this.comps = this.compCollection.valueChanges().subscribe(item =>{
      this.profilePic = item.profilePic.file;
      console.log(this.profilePic)
    })
  }

  updateProfilePic() {
		this.fileBtn.nativeElement.click()
  }
  
  //store url on firestore
  uploadPic(event) {
		const files = event.target.files

		const data = new FormData()
		data.append('file', files[0])
		data.append('UPLOADCARE_STORE', '1')
		data.append('UPLOADCARE_PUB_KEY', '24010da0b46934853c73')
		
		this.http.post('https://upload.uploadcare.com/base/', data)
		.subscribe(event => {
			const uuid = event;
			this.compCollection.update({
				profilePic: uuid
			})
		})
	}

  ngOnInit() {
    const compId: string = this.route.snapshot.paramMap.get('id'); //get id

     
     this.compCollection = this.afStore.doc(`companies/${compId}`)
     this.comps = this.compCollection.valueChanges().subscribe(item =>{
     this.plansAr = item.plansArray
     this.compName = item.displayName
     this.compAddress = item.address
     this.compNumber = item.phoneNo
     this.compAreas = item.eAreas


     //for company id collection
     this.compNameId = item.id
     
     })

      //use reviews subcollections
    this.reviewSub = this.afStore.collection('companies/'+compId+'/reviews');
    this.items = this.reviewSub.valueChanges(); 
    console.log(this.items)

    //use plans subcollections
    this.planSub = this.afStore.collection('companies/'+compId+'/plans');
    this.plans = this.planSub.valueChanges(); 
     // console.log(this.plans)

        //use subscribers subcollections
    this.userSubs = this.afStore.collection('companies/'+compId+'/subscribers');
    this.subscriber = this.userSubs.valueChanges(); 
    console.log(this.subscriber.email)

        
  }

  editProfile(){
    //change display name
    this.compCollection.update({
     displayName: this.compName
    })

     //change company address
     this.compCollection.update({
      address: this.compAddress
     })

      //change company number
    this.compCollection.update({
      phoneNo: this.compNumber
     })

      //change areas
    this.compCollection.update({
      eAreas: this.compAreas
     })

    this.presentAlert('Saved!', 'Profile Updated')
    console.log("success")
  }

  async terminateSub(subs){
    const compId: string = this.route.snapshot.paramMap.get('id'); //get id  

    const actionSheet = await this.actionSheetCtrl.create({
      header: "Terminate "+ subs.userName + "'s subscription?",
      buttons: [
        {
          text: 'Terminate',
          handler: () => {
            
            //cancel sub
            this.userDocs = this.afStore.doc(`users/${subs.userId}`);
            this.userDocs.update({
              plans: "",
              subscribeTo: "",
              subscribed: false
             })
            
            
            this.afStore.collection('companies/'+compId+'/subscribers/').doc(subs.userId).delete();
           
          }
        }
      ]
    })
    await actionSheet.present();
  }

  deleteCompany(){
 
    return this.saveOrNotAlert('Wait!', 'Are you sure you want to delete ' + this.compName + '?' )

  }

 userN
 reviewss
 id: string

 reviewId: string

  revTitle
  async selectReview(item){
    const compId: string = this.route.snapshot.paramMap.get('id'); //get id  

    const actionSheet = await this.actionSheetCtrl.create({
      header: "Delete "+ item.userName + "'s review?",
      buttons: [
        {
          text: 'Delete',
          handler: () => {
            
            //functions
            console.log(item.id)
            this.afStore.collection('companies/'+compId+'/reviews/').doc(item.id).delete();
           
          }
        }
      ]
    })
    await actionSheet.present();
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

		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: [{
        text: 'Yes',
        handler: () =>{
          this.afStore.collection('companies/').doc(compId).delete();
          this.router.navigate(['/admin-comps'])
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
