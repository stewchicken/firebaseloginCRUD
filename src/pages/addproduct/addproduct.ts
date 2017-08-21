import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Product } from "../../models/product";

/**
 * Generated class for the AddproductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-addproduct',
  templateUrl: 'addproduct.html',
})
export class AddproductPage {
  product = {} as Product;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddproductPage');
  }

}
