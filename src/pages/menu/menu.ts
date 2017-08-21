import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductsPage } from "../products/products";

/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  navtoProduct(){
    this.navCtrl.push(ProductsPage);
  }

}
