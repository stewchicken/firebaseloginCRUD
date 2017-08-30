import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddproductPage } from "../addproduct/addproduct";
//import * as firebase from 'firebase';
import { Product } from "../../models/product";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { ImageProvider } from "../../providers/image/image";
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  products: Product[] = [];
  productItemRef$: FirebaseListObservable<Product[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private database: AngularFireDatabase, private imageSrv: ImageProvider, private afAuth: AngularFireAuth) {
    this.onAuthCallback = this.onAuthCallback.bind(this);
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

  ionViewWillEnter() {
    // When the callback is triggered, it will have the 
    // proper value for 'this'.
   this.afAuth.auth.onAuthStateChanged(this.onAuthCallback);
  }

  ionViewDidLoad() {
    debugger;
    this.productItemRef$ = this.database.list('productitems');
    this.productItemRef$.
      subscribe(
      (data: any) => {
        console.log("datatype is :" + typeof data);
        console.log("data ###### " + data);
        console.log("data length ###### " + data.length);
        this.products = data;
        for (let i = 0; i < this.products.length; i++) {
          //console.log(nums[i]) 
          this.products[i].imagename;
          console.log("imagename: " + this.products[i].imagename);
          this.imageSrv.getImage("products", this.products[i].imagename).then(
            imageUrl => {
              this.products[i].imageUrl = imageUrl;
              console.log("imageUrl:" + this.products[i].imageUrl);
            }
          );
        }
      }
      );



    console.log('ionViewDidLoad ProductsPage');
  }

  navtoAddProductPage() {
    this.navCtrl.push(AddproductPage);
    //push will have make backbutton for AddproductPage, setRoot will not 
    //this.navCtrl.setRoot();
  }
}
