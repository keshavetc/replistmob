import { Component,ViewChild  } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NavController } from 'ionic-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('rootNav') nav: NavController
  rootPage:any = 'IntroPage';
 
  constructor(platform: Platform, private statusBar: StatusBar, splashScreen: SplashScreen,) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.statusBar.styleLightContent();
    });

    if(localStorage.getItem('uid'))
    {
      if(localStorage.getItem('role') == 'rep'){
       
              this.rootPage='RepWelcomePage'//,{'user':JSON.parse(localStorage.getItem('user'))});
        
      }else if(localStorage.getItem('role') == 'buyer'){
        this.rootPage='BuyerWelcomePage'//,{'user':JSON.parse(localStorage.getItem('user'))});
      }
    }
  }
}

