import {Injectable} from "@angular/core";
import {ToastController} from "ionic-angular";

@Injectable()
export class ToastService {
  constructor(private toastCtrl: ToastController) {

  }

  presentSimpleToast(message:string,time:number): Promise<any> {
    const toast = this.toastCtrl.create({
      message: message,
      duration: time
    });
    return toast.present();
  }
}
