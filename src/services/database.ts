import {Injectable} from "@angular/core";
import * as firebase from 'firebase';
import { rejects } from "assert";
import { resolve } from "url";
import { LoadingController } from 'ionic-angular';
import {LoaderService} from "../services/loader";

@Injectable()
export class DatabaseService {
loading:any;
  constructor(
     public loadingCtrl: LoadingController,
     private loader: LoaderService,
  ) {

  }

  setUserData(path, data) {
    return firebase.firestore().collection('users').doc(path).set(data)
  }

  setItemData(path, data) {
    return firebase.firestore().collection('products').doc(path).set(data)
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

  setItem(id,data)
  {
   
    var dt=JSON.parse(data);
    console.log(dt);
      return new Promise((res, rej) => {
    
    firebase.firestore().collection("products").add(dt)
  .then(function(docRef) {
     // console.log("Document written with ID: ", docRef);
      res(docRef);
    })
  .catch(function(error) {
      console.error("Error adding document: ", error);
      rej(error);
  });
});

  }

  getuseritem(uid)
  {
    var data=[];
    console.log(uid);
    return new Promise((res, rej) => {
      firebase.firestore().collection("products").where("uid", "==",uid )
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
           // console.log(doc.id, " => ", doc.data());
            data.push({id:doc.id,data:doc.data()});
          
        });
        res(data);
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
        rej(error);
    });
  });
  }


  getrepbuyer()
  {
    var data=[];
    return new Promise((res, rej) => {
      firebase.firestore().collection("users").where("role", "==", "buyer")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
           // console.log(doc.id, " => ", doc.data());
            data.push({id:doc.id,data:doc.data()});
            
        });
        res(data);
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
        rej(error);
    });
  });


  
  }


  
  searchrepbuyer(str)
  {
    let base=this;
    var data=[];
    return new Promise((res, rej) => {
      firebase.firestore().collection("users").where("role", "==", "buyer").where("name", "==", str)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
           // console.log(doc.id, " => ", doc.data());
            data.push({id:doc.id,data:doc.data()});
           
        });

        if(data.length==0)
        {
          base.searchrepbuyer1(str).then(data1=>{
            res(data1);
          });

        }
        else
        {
          res(data);
        }


       
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
        rej(error);
    });
  });


  
  }

   
  searchrepbuyer1(str)
  {
    let base=this;
    var data=[];
    return new Promise((res, rej) => {
      firebase.firestore().collection("users").where("role", "==", "buyer").where("email", "==", str)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
           // console.log(doc.id, " => ", doc.data());
            data.push({id:doc.id,data:doc.data()});
           
        });

        if(data.length==0)
        {
          base.searchrepbuyer2(str).then(data1=>{
            res(data1);
          });

        }
        else
        {
          res(data);
        }
      
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
        rej(error);
    });
  });
  
  }

 
  searchrepbuyer2(str)
  {
    let base=this;
    var data=[];
    return new Promise((res, rej) => {
      firebase.firestore().collection("users").where("role", "==", "buyer").where("business", "==", str)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
           // console.log(doc.id, " => ", doc.data());
            data.push({id:doc.id,data:doc.data()});
           
        });

        if(data.length==0)
        {
          res(null);

        }
        else
        {
          res(data);
        }
        
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
        rej(error);
    });
  });
  
  }







  presentLoadingDefault() {
    this.loader.presentLoadingText('Please wait');
  
 
  
  }


  loadingdismiss()
  {
    this.loader.stopLoader();
  }



  getrep()
  {
    var data=[];
    return new Promise((res, rej) => {
      firebase.firestore().collection("users").where("role", "==", "rep")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
           // console.log(doc.id, " => ", doc.data());
            data.push({id:doc.id,data:doc.data()});
            
        });
        res(data);
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
        rej(error);
    });
  });


  
  }





  
  searchrep(str)
  {
    var data=[];
    return new Promise((res, rej) => {
      firebase.firestore().collection("users").where("role", "==", "rep").where("name", "==", str)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
           // console.log(doc.id, " => ", doc.data());
            data.push({id:doc.id,data:doc.data()});
           
        });
        res(data);
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
        rej(error);
    });
  });


  
  }

   
  searchrep1(str)
  {
    var data=[];
    return new Promise((res, rej) => {
      firebase.firestore().collection("users").where("role", "==", "rep").where("email", "==", str)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
           // console.log(doc.id, " => ", doc.data());
            data.push({id:doc.id,data:doc.data()});
           
        });
        res(data);
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
        rej(error);
    });
  });
  
  }

 
  searchrep2(str)
  {
    var data=[];
    return new Promise((res, rej) => {
      firebase.firestore().collection("users").where("role", "==", "rep").where("companyname", "==", str)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
           // console.log(doc.id, " => ", doc.data());
            data.push({id:doc.id,data:doc.data()});
           
        });
        res(data);
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
        rej(error);
    });
  });
  
  }



}
