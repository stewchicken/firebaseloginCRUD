import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Product } from "../../models/product";
import { CameraOptions, Camera } from "@ionic-native/camera";
import { ImageProvider } from "../../providers/image/image";
import { UUID } from 'angular2-uuid';
import * as firebase from 'firebase';

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
  captureDataUrl: string;
  cameraOptions: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera,
    private imageSrv: ImageProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddproductPage');
  }

  onAddProduct(product: Product) {
    this.product.category=product.category;
    this.product.details=product.details;
    this.product.id=UUID.UUID();
    this.product.name=product.name;
    this.product.price=product.price;

    let ref = firebase.database().ref('productitems');
    ref.push(product);

  }
  takePicAndUpload() {
    let picname = UUID.UUID() + '.jpg';
    this.camera.getPicture(this.cameraOptions)
      .then(data => {
        let base64Image = 'data:image/jpeg;base64,' + data;
        //image: string, namespace: string, imageName: string
        //   <img [src]="captureDataUrl"  *ngIf="captureDataUrl"/>
        this.captureDataUrl = base64Image;
        return this.imageSrv.uploadImage(base64Image, 'products', picname);
      })
      .then(data => {
        //upload is done
        this.product.imagename = picname;
      });

  }

}
