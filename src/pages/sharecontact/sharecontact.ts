import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-sharecontact',
  templateUrl: 'sharecontact.html',
})
export class SharecontactPage {
  private checkbool: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SharecontactPage');
  }

  checkAll() {
    var checkboxes = document.getElementsByTagName('input'), val = null;

    if (this.checkbool == false) {
      this.checkbool = true;
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == 'checkbox') {
          if (val === null) val = checkboxes[i].checked = true;
          checkboxes[i].checked = val;
        }
      }
    } else {
      this.checkbool = false;
      for (i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == 'checkbox') {
          if (val === null) val = checkboxes[i].checked = false;
          checkboxes[i].checked = val;
        }
      }
    }
  }

  share() {
    this.navCtrl.push('RepFriendsPage')
  }
}
