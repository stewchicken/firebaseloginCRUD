import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddproductPage } from "../addproduct/addproduct";

/**
 * Generated class for the ProductsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }

  navtoAddShoppingPage(){
    this.navCtrl.push(AddproductPage);
    //push will have make backbutton for AddproductPage, setRoot will not 
    //this.navCtrl.setRoot();
  }
}
