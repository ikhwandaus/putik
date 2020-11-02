import { Component, OnInit } from '@angular/core';


import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from "angularfire2/firestore";
import { FirestoreService } from '../services/data/firestore.service';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase';

// import { ConsoleReporter } from 'jasmine';


@Component({
  selector: 'app-comp-plans',
  templateUrl: './comp-plans.page.html',
  styleUrls: ['./comp-plans.page.scss'],
})
export class CompPlansPage implements OnInit {

  planCollection: AngularFirestoreDocument<any>;
  plans
  plansAr
  planPrice
  planDescr
  planDetails
  compName

  items

  userDocs: AngularFirestoreDocument
  userCollection: AngularFirestoreCollection
  user
  userPlan
  userSub
  username
  isSubscribed
  subscribed
  userEmail

  compCollection: AngularFirestoreDocument<any>;
  comps

  constructor(   
    private route: ActivatedRoute,
    private afStore: AngularFirestore,
    private firestoreService: FirestoreService,
    private alertController: AlertController,
    private afAuth: AngularFireAuth,
    ) {

    const compId: string = this.route.snapshot.paramMap.get('id'); //get comp id
    const planId: string = this.route.snapshot.paramMap.get('idPlan'); //get plan id

    this.planCollection = this.afStore.doc('/companies/'+compId +`/plans/${planId}`)
    this.plans = this.planCollection.valueChanges().subscribe(item =>{
      // this.plansAr = item.plansArray
      this.planPrice = item.price
      this.planDescr = item.descr
      // this.planDetails = item.subDetails
      this.planDetails = item.detailArray
      // this.compName = item.compName
   })
   
   this.afAuth.authState.subscribe(data => {
  
   try {
    this.userDocs = this.afStore.doc(`users/${data.uid}`)//get user UID
   } catch (error) {
     console.log();
   }

   this.user = this.userDocs.valueChanges().subscribe(item =>{//set contents from users collection/docs to variables
    //  this.userName = item.userName
    //  this.email =item.email
    //  this.icNo = item.icNo
    //  this.phoneNo = item.phoneNo
    //  this.address = item.address
    //  this.password = item.password
    this.userPlan = item.plans
    this.userSub = item.subscribeTo
   })
  
   })

   this.compCollection = this.afStore.doc(`companies/${compId}`)
     this.comps = this.compCollection.valueChanges().subscribe(item =>{
     this.compName = item.displayName
    
     })

     // identify if user is subscribed
   firebase.auth().onAuthStateChanged(user => {
    if (user) {
      firebase.firestore().doc(`users/${user.uid}`).get().then(usersSnapshot => {
        this.subscribed = usersSnapshot.data().subscribed;
      });
     }
   }); 

      

     }

  ngOnInit() {

    //user details
    this.afAuth.authState.subscribe(data => {

      try {
        this.userDocs = this.afStore.doc(`users/${data.uid}`)//get user UID  
      } catch (error) {
        console.log();
      }
      

      this.user = this.userDocs.valueChanges().subscribe(item =>{//set contents from users collection/docs to variables
        //  this.userName = item.userName
        //  this.email =item.email
        //  this.icNo = item.icNo
        //  this.phoneNo = item.phoneNo
        //  this.address = item.address
        //  this.password = item.password
        this.userPlan = item.plans
        this.userSub = item.subscribeTo
        this.isSubscribed = item.subscribed

        console.log(this.subscribed)

        //paypal
        if(this.subscribed == false){

          let _this = this;
            setTimeout(() => {
              // Render the PayPal button into #paypal-button-container
             
              <any>window['paypal'].Buttons({
      
                style: {
                  color:  'blue',
                  shape:  'pill',
                  label:  'pay',
                  height: 40
              },
        
                // Set up the transaction
                createOrder: function (data, actions) {
                  return actions.order.create({
                    purchase_units: [{
                      amount: {
                        value: _this.planPrice,
                        currency: 'SGD'
                      }
                    }]
                  });
                },
        
                // Finalize the transaction
                onApprove: async (data, actions) => {
                  const order = actions.order.capture()
                  this.successPayment()
                  // return actions.order.capture()
                  
                    // .then(function (details) {
                    //   // Show a success message to the buyer
                    //   // this.presentAlert('Success', 'You have successfully subscribed to a' + this.planDescr)
                    //   console.log(data)
                    //   alert('Transaction completed by ' + details.payer.name.given_name + '!');
                      
                    //   //assign plan to current user
                    //   //generate pdf and send email
                    //   //save pdf receipt to 
                      
                    // })
                    // .catch(err => {
                    //   console.log(err);
                    // })
                },
                onError: err => {
                  console.log(err);
                }
              }).render('#paypal-button-container');
            }, 500)
          }
      
       })
     })   
  }

  async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: [{
        text: 'Ok',
        handler: () =>{
          window.location.reload()
        }
      }]
		})

		await alert.present()
  }


  successPayment(){
   
    
    const planId: string = this.route.snapshot.paramMap.get('idPlan'); //get plan id
    const compId: string = this.route.snapshot.paramMap.get('id'); //get comp id

    //user details
    this.afAuth.authState.subscribe(data => {
      this.userDocs = this.afStore.doc(`users/${data.uid}`)//get current user UID
  
       this.user = this.userDocs.valueChanges().subscribe(item =>{//set contents from users collection/docs to variables
        this.userPlan = item.plans
        this.userSub = item.subscribeTo
        this.isSubscribed = item.subscribed
        this.username = item.userName
        this.userEmail = item.email

        if(this.isSubscribed == false){
          this.userDocs.update({
            plans: planId,
            subscribeTo: compId,
            subscribed: true
          })

          this.afStore.doc('companies/' + compId + `/subscribers/${data.uid}`).set({
            userId: data.uid,
            planId: planId,
            userName: this.username,
            email: this.userEmail
          });
          // this.subscribed = true;
        }
          this.presentAlert('Transaction Success!', 'You have successfully subscribed to the ' + this.planDescr + '. An e-receipt has been sent to your email')
  
       })
     })

    
   
  }

}
