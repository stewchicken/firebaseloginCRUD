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
  loggedin = false;
  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login(user: User) {

    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then((session) => {
      let firebaseuser = session.currentUser;
      console.log(firebaseuser);
      console.log(this.afAuth.auth.currentUser);
      this.loggedin = true;
      this.user = {} as User;
      this.navCtrl.push(MenuPage);

    }).catch(error => {
      this.loggedin = false;
      user.email = "email  maybe wrong!"
      user.password = "password maybe not correct!"
    });
  }

  async logout() {
    this.afAuth.auth.signOut().then(function () {
      // Sign-out successful.
      this.loggedin = false;
    }, function (error) {
      // An error happened.
    });

  }

  register() {
    this.navCtrl.push(RegisterPage);
    // this.navCtrl
  }
}
