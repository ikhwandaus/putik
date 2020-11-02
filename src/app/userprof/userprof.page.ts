import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from "angularfire2/firestore";
import { FirestoreService } from '../services/data/firestore.service';
import { AngularFireAuth } from 'angularfire2/auth'
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-userprof',
  templateUrl: './userprof.page.html',
  styleUrls: ['./userprof.page.scss'],
})
export class UserprofPage implements OnInit {

  userDocs: AngularFirestoreDocument
  user

  userEmail
  username
  icNumber
  phoneNumber
  userAddress
  userSub: string
  userPlan: string
  userId

  planCollection: AngularFirestoreDocument<any>;
  plans
  plansAr
  planPrice
  planDescr
  planDetails

  compCollection: AngularFirestoreDocument<any>;
  comps
  compName

  subscribed
  isUsersub;

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private firestoreService: FirestoreService,
    private router: Router,
    private alertController: AlertController,
    public toastController: ToastController,
  ) { 
    // identify if user is subscribed
   firebase.auth().onAuthStateChanged(user => {
    if (user) {
      firebase.firestore().doc(`users/${user.uid}`).get().then(usersSnapshot => {
        this.subscribed = usersSnapshot.data().subscribed;
      });
     }
   }); 
  }

  async logOut(): Promise<void> {
    await this.firestoreService.logout();
    // this.router.navigateByUrl('lo');
   }

  ionViewWillEnter(){
     //ref & take data from firestore
     this.afAuth.authState.subscribe(data => {

     try {
      this.userDocs = this.afStore.doc(`users/${data.uid}`)
     } catch (error) {
       console.log()
     } 
      

      this.user = this.userDocs.valueChanges().subscribe(item =>{
        this.username = item.userName
        this.userEmail =item.email
        this.icNumber = item.icNo
        this.phoneNumber = item.phoneNo
        this.userAddress = item.address
        this.userSub = item.subscribeTo
        this.userPlan = item.plans
        this.isUsersub = item.subscribed
        
        // console.log(this.username)
        // console.log(this.userPlan)
    if(this.isUsersub == true){
      this.planCollection = this.afStore.doc(`/companies/${this.userSub}`+`/plans/${this.userPlan}`)
      this.plans = this.planCollection.valueChanges().subscribe(item =>{
        // this.plansAr = item.plansArray
        this.planPrice = item.price
        this.planDescr = item.descr
        // this.planDetails = item.subDetails
        this.planDetails = item.detailArray
        // this.compName = item.compName
     })
  
       this.compCollection = this.afStore.doc(`companies/${this.userSub}`)
       this.comps = this.compCollection.valueChanges().subscribe(item =>{
       this.compName = item.displayName
       })
    }
   

      })
    })
   }


   cancelSub(){
    this.compCollection = this.afStore.doc(`companies/${this.userSub}`)
    this.comps = this.compCollection.valueChanges().subscribe(item =>{
    this.compName = item.displayName

    return this.cancelOrNot('Warning!', 'You are about to cancel your subscription with ' +this.compName+ '. Are you sure you want to continue?')

    })

    
   }

   async cancelOrNot(title: string, content: string) {

 



		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: [{
        text: 'Yes',
        handler: () =>{

             //get user data
            this.afAuth.authState.subscribe(data => {
               this.userDocs = this.afStore.doc(`users/${data.uid}`)
               this.user = this.userDocs.valueChanges().subscribe(item =>{
                  this.userPlan = item.plans
                  this.userId = item.id
        
                   //cancel sub
                     this.userDocs.update({
                      plans: "",
                      subscribeTo: "",
                      subscribed: false
                     })
                   //delete subcollection
                    this.afStore.collection('companies/'+this.userSub+'/subscribers/').doc(this.userId).delete();
                     

                    setTimeout(() =>{
                    window.location.reload();
                    }, 2000)
                    setTimeout(() =>{
                      this.successToast();
                    },500)
                    
               })
             })
        }

      },{
        text: 'Cancel',
        role: 'cancel'
        // handler: () =>{
        //    this.editProfile
        // }
      }
      ]
		})

		await alert.present()
  }

  async successToast() {
    const toast = await this.toastController.create({
      message: 'Your Subscription is Successfully Cancelled',
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
  }





}
