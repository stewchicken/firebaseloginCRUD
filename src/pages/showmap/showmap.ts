import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireAuth } from "angularfire2/auth";
import { Accident } from "../../models/accident";
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { Subscription } from "rxjs/Subscription";
import { ImageProvider } from "../../providers/image/image";
import { AddaccidentPage } from "../addaccident/addaccident";

declare var google: any;

/**
 * Generated class for the ShowmapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-showmap',
  templateUrl: 'showmap.html',
})
export class ShowmapPage {
  @ViewChild('map') mapRef: ElementRef;


  accidents: Accident[] = [];
  accidentsItemRef$: FirebaseListObservable<Accident[]>;
  subscription: Subscription;

  title: string = 'My current Location';
  lat: number;
  lng: number;


  constructor(private geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private database: AngularFireDatabase, private imageSrv: ImageProvider) {
  }

  ionViewDidLoad() {
    console.log('this.mapRef' + this.mapRef);
    this.showMap();
  }

  showMap() {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      console.log("lat: xxx "+this.lat);
      console.log("lng: xxx "+this.lng)
      
    }).catch((error) => {
      console.log('Error getting location', error);
    });


  }



  ionViewWillEnter() {
    this.showMap();
    console.log('ionViewDidLoad ShowMapPage');
    console.log('ionViewWillEnter HousePage');
    this.afAuth.auth.onAuthStateChanged(this.onAuthCallback);
    this.accidentsItemRef$ = this.database.list('accidentitems');
    this.subscription = this.accidentsItemRef$.
      subscribe(
      (data: any) => {
        this.accidents = data as Accident[];
        for (let i = 0; i < this.accidents.length; i++) {
          this.accidents[i].imagename;
          console.log("imagename: " + this.accidents[i].imagename);
          this.imageSrv.getImage("houses", this.accidents[i].imagename).then(
            imageUrl => {
              this.accidents[i].imageUrl = imageUrl;
              console.log("imageUrl:" + this.accidents[i].imageUrl);
            }
          ).catch(
            error => {
              console.log(error);
            }
            );
        }
      });
    console.log('ionViewDidLoad HousePage');
  }

  ionViewWillLeave() {
    //this.subscription.unsubscribe();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  navtoAddAccidentPage() {
    this.navCtrl.push(AddaccidentPage);
  }

  logout() {
    let housePage = this;
    this.afAuth.auth.signOut().then(function () {
      housePage.navCtrl.popToRoot();
    }, function (error) {
      // An error happened.
    });
  }

  onAuthCallback(user) {
    if (!user) {
      console.log("user is not logged in");
      //this.logOut();
      this.navCtrl.popToRoot()
    } else {
      console.log("user is logged in");
      return;
    }
  }


}
