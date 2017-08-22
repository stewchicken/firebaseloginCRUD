import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Product } from "../../models/product";
import { CameraOptions, Camera } from "@ionic-native/camera";
import { ImageProvider } from "../../providers/image/image";
import { UUID } from 'angular2-uuid';

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
  cameraOptions: CameraOptions = {
    quality: 100,
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

  takePicAndUpload() {
    let picname = UUID.UUID()+'.jpg';
    this.camera.getPicture(this.cameraOptions)
      .then(data => {
        let base64Image = 'data:image/jpeg;base64,' + data;
        //image: string, namespace: string, imageName: string
        
        return this.imageSrv.uploadImage(base64Image, 'products', picname);
      })
      .then(data => {
        this.product.imagename=picname;
      });

  }

}
