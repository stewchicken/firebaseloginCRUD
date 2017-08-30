import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";


import { AngularFireAuthModule } from "angularfire2/auth";
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FIREBASE_CONFIG } from "./app.firebase.config";
import { RegisterPage } from "../pages/register/register";
import { LoginPage } from "../pages/login/login";
import { MenuPage } from "../pages/menu/menu";
import { ProductsPage } from "../pages/products/products";
import { ShoppingPage } from "../pages/shopping/shopping";
import { AddproductPage } from "../pages/addproduct/addproduct";
import { ImageProvider } from '../providers/image/image';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    MenuPage,
    ProductsPage,
    ShoppingPage,
    AddproductPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    MenuPage,
    ProductsPage,
    ShoppingPage,
    AddproductPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ImageProvider,
    Camera
  ]
})
export class AppModule { }
