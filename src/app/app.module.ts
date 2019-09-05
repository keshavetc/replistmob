
import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import {MyApp} from './app.component';
import {Camera} from "@ionic-native/camera";
import {env} from "../env";
import * as firebase from 'firebase';
import {ToastService} from "../services/toast";
import {CameraService} from "../services/camera";
import {AuthService} from "../services/auth";
import {DatabaseService} from "../services/database";
import {LoaderService} from "../services/loader";
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';


 
import { HttpClientModule } from '@angular/common/http';





firebase.initializeApp(env.firebaseConfig);

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    ToastService,
    CameraService,
    AuthService,
    DatabaseService,
    LoaderService,
    PayPal,
   
    
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
