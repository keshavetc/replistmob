import { Component } from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import * as firebase from 'firebase';
import { RepAddItem } from "../../models/repadditem";
import {FormControl, FormGroup} from "@angular/forms";
import {ToastService} from "../../services/toast";
import {CameraService} from "../../services/camera";
import { Observable } from 'rxjs';
import {DatabaseService} from "../../services/database";
import { LoadingController } from 'ionic-angular';


const storageService = firebase.storage();
const storageRef = storageService.ref();


@IonicPage()
@Component({
  selector: 'page-sharecontact',
  templateUrl: 'sharecontact.html',
})
export class SharecontactPage {
  private checkbool: boolean = false;
  searchTerm: string = '';
  selectedList:any=[];

  user:any;
  repbuyerdata:any=[];
  str:any;
 

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
   public actionSheetCtrl: ActionSheetController,
    private cameraplay: CameraService, private camera: Camera, private toasts: ToastService,
             private dbs:DatabaseService,
             public loadingCtrl: LoadingController
  ) {


   this.user=navParams.get('shared');
 
   
    this.getfriends();
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
let base=this;
    if(base.selectedList.length==0)
    {
      base.dbs.presentAlert('No Contact Selected To Share with!','Alert');
    }
    else
    {

      var data={
        sharedWith:base.selectedList,
        sharedBy:{id:localStorage.getItem('uid'),data:localStorage.getItem('user')},
        sharedByid:localStorage.getItem('uid'),
        shared:base.user.data.email,
        sharedata:base.user,
        date:new Date().toLocaleString()
      };

      base.dbs.getSharedIfExist(base.user.data.email).then(dt=>{
            var result:any=[];
            result=dt;
            if(result.length>0)
            {
              var c=0;
              var len=result.length;
              for(var i=0;i<len;i++)
              {
                base.dbs.getSharedbyid(result[i].id).then(data=>{
                  console.log(data)
                  var rs:any=data;
                  if(rs.exists)
                  {
                   // console.log(result[i],'---',rs.id);
                    
                    base.dbs.removeshareList(rs.id);
                    //base.dbs.presentAlert('This Contact is already been shared!','Message');
                   
                  }
                

                });

                
              }

              base.dbs.addToShareList(data).then(res=>{
                base.dbs.presentAlert('Successfully shared with '+base.selectedList.length+' contacts.','Message');
                      });
              //   base.dbs.presentAlert('This Contact is already been shared!','Message');
              //getSharedbyid(id)
            }
            else
            {
              base.dbs.addToShareList(data).then(res=>{
                base.dbs.presentAlert('Successfully shared with '+base.selectedList.length+' contacts.','Message');
                      });
            }
      });

    

    }
    //this.navCtrl.push('RepFriendsPage')
  }

  getfriends()
  {
    let base=this;
    base.dbs.presentLoadingDefault();
    base.dbs.getAcceptedFriends(localStorage.getItem('uid')).then(data=>{
      var res:any=[];
      res=data;
      base.repbuyerdata=[];
     res.forEach(element => {
     
      base.dbs.getUserById(element.data.from).then(dat=>{
        var x:any=[];
        x=dat[0];  
        
        if(element.id!=base.user.id)
        base.repbuyerdata.push({id:element.id,data:x.data});
      });
     });
   
    
      base.dbs.loadingdismiss();
    });
  }


  select(rep)
  {
    var ind=this.selectedList.indexOf(rep.data.email);
    if(ind==-1)
    {
      this.selectedList.push(rep.data.email);
    }
    else
    {
      this.selectedList.splice(ind,1);
    }

    console.log(this.selectedList);
  }
}
