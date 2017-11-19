import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

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



  constructor(private geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('this.mapRef' + this.mapRef);
    this.showMap();
  }

  showMap() {

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude

      //location - lat long
      let location = { lat: resp.coords.latitude, lng: resp.coords.longitude };
      const options = {
        zoom: 10,
        center: location
      }
      let map = new google.maps.Map(this.mapRef.nativeElement, options
      )
      console.log("showMap location: " + location);

     /*
      var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'Hello World!'
      });
      */
      this.addMarker(location, map, 'helloworld!');
    }).catch((error) => {
      console.log('Error getting location', error);
    });


  }

  addMarker(location, map, title) {
   return new google.maps.Marker({
        position: location,
        map: map,
        title: title
      });
  }


}
