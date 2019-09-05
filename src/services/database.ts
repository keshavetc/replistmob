import {Injectable} from "@angular/core";
import * as firebase from 'firebase';

@Injectable()
export class DatabaseService {

  constructor() {

  }

  setUserData(path, data) {
    return firebase.firestore().collection('users').doc(path).set(data)
  }

  getAllUsers() {
    return new Promise((res, rej) => {
      firebase.firestore().collection('users').get().then((users) => {
        let alluser: any[] = [];
        users.forEach((user) => {
          alluser.unshift(user.data());
        });
        res(alluser);
      });
    });
  }

  getSingleUser(path){
    return new Promise((res, rej) => {
      firebase.firestore().collection('users').doc(path).get().then((user) => {
        res(user.data());
      });
    });
  }


  UpdateUser(path,data){
    return firebase.firestore().collection('users').doc(path).update(data)
  }

   saveImage(path,img_data){
     return firebase.storage().ref(path).putString(img_data,'data_url')
   }



  getItemDetails(path){
    return new Promise((res, rej) => {
      firebase.firestore().collection('products').doc(path).get().then((product) => {
        res(product.data());
      });
    });
  }
  
getAllItems() {
    return new Promise((res, rej) => {
      firebase.firestore().collection('products').get().then((products) => {
        let allitems: any[] = [];
        products.forEach((user) => {
          allitems.unshift(user.data());
        });
        res(allitems);
      });
    });
  }


}
