import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from "angularfire2/auth";
import { RegisterPage } from "../register/register";
import { MenuPage } from "../menu/menu";



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login(user: User) {

    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then((session) => {
      console.log(session.currentUser);
       this.navCtrl.push(MenuPage);
    }).catch(error => {
      user.email = "email  maybe wrong!"
      user.password = "password maybe not correct!"
    });
  }

  register() {
    this.navCtrl.push(RegisterPage);
    // this.navCtrl
  }
}
