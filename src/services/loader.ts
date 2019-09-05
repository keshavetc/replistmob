import {Injectable} from "@angular/core";
import {Loading, LoadingController} from "ionic-angular";

@Injectable()
export class LoaderService {
  loading:Loading;
  constructor(private loadingCtrl: LoadingController){}

  presentLoadingText(message) {
    this.loading = this.loadingCtrl.create({
      content: "Please wait..."
    });
    return this.loading.present();
  }

  stopLoader(){
    this.loading.dismissAll();
  }


}
