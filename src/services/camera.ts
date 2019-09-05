import {Injectable} from "@angular/core";
import {ActionSheetController, ToastController} from "ionic-angular";
import {Camera, CameraOptions} from "@ionic-native/camera";

@Injectable()
export class CameraService {
  camera_options: CameraOptions = {
    // Some common settings are 20, 50, and 100
    destinationType: this.camera.DestinationType.DATA_URL,
    quality: 20,
    targetWidth: 300,
    targetHeight: 300,
    //Corrects Android orientation quirks
  };
  gallery_options: CameraOptions = {
    // Some common settings are 20, 50, and 100
    quality: 50,
    targetWidth: 800,
    targetHeight: 600,
    destinationType: this.camera.DestinationType.DATA_URL,
    // In this app, dynamically set the picture source, Camera or photo gallery
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    encodingType: this.camera.EncodingType.PNG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit: true,
    correctOrientation: true  //Corrects Android orientation quirks
  };

  constructor(private actionSheetCtrl: ActionSheetController, private camera: Camera) {

  }

  presentChooseOption() {
    return new Promise((res, rej) => {
      let actionSheet = this.actionSheetCtrl.create({
        title: 'Profile Pic',
        buttons: [
          {
            text: 'Take Photo',
            handler: () => {
              this.camera.getPicture(this.camera_options).then((image_data) => {
                var base64Image = 'data:image/png;base64,' + image_data;
                res(base64Image);
              });

            }
          },
          {
            text: 'Add Photo',
            handler: () => {
              this.camera.getPicture(this.gallery_options).then((image_data) => {
                var base64Image = 'data:image/png;base64,' + image_data;
                res(base64Image);
              });
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              res('');
            }
          }
        ]
      });

      actionSheet.present();
    });

  }
}
