import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import { ModalController} from 'ionic-angular';
import {AutocompletePage} from '../autocomplete/autocomplete';

declare var google;

@IonicPage()
@Component({
  selector: 'page-rep-search',
  templateUrl: 'rep-search.html',
})
export class RepSearchPage {
  @ViewChild('map') mapElement: ElementRef;
  private map: any;
  address:any={
    place: ''
  };
  constructor(public navCtrl: NavController,
              public navParams: NavParams
              ,
    private ModalCtrl:ModalController) {
      
  }

  showAddressModal () {
    let modal = this.ModalCtrl.create(AutocompletePage);
    let me = this;
    modal.onDidDismiss(data => {
      this.address.place = data;
    });
    modal.present();
  }


  ionViewDidLoad() {
    setTimeout(() => {
      this.loadMap();
    }, 1000)
  }

  loadMap() {
    let latLng = new google.maps.LatLng(48.8509695, 2.3861870000000636);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    var marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        title: ''
      }
    )



  }





}
