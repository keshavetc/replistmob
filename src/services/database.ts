import {Injectable} from "@angular/core";
import * as firebase from 'firebase';
import { rejects } from "assert";
import { resolve } from "url";
import { LoadingController } from 'ionic-angular';
import {LoaderService} from "../services/loader";
import { AlertController } from 'ionic-angular';

@Injectable()
export class DatabaseService {
loading:any;

  constructor(
     public loadingCtrl: LoadingController,
     private loader: LoaderService,
     private alertCtrl: AlertController
  ) {

  }

  
  presentAlert(msg,sub) {
    let alert = this.alertCtrl.create({
      title: sub,
      subTitle: msg,
      buttons: ['Dismiss']
    });
    alert.present();
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


  addfetchcart(id=null,data=null)
  {
   
    if(id)
    {
      return new Promise((res, rej) => {
    
        firebase.firestore().collection("cart").where("uid", "==",id)
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
    else
    {
      return new Promise((res, rej) => {
      
        firebase.firestore().collection("cart").add(data)
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
  
     

  }

  setItem(id=null,data=null)
  {
   
    if(id)
    {
      return new Promise((res, rej) => {
    
        firebase.firestore().collection("products").doc(id).update(data);
    });
    }
    else
    {
      return new Promise((res, rej) => {
        //console.log("Document written with ID: ", data);
        firebase.firestore().collection("products").add(data)
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


  addToSoldOut(data,id=null,datas=null)
  {
   
    console.log(data);
      return new Promise((res, rej) => {
    
    firebase.firestore().collection("soldout").add(data)
  .then(function(docRef) {
     // console.log("Document written with ID: ", docRef);
     firebase.firestore().collection("products").doc(id).update(datas);
      res(docRef.id);
    })
  .catch(function(error) {
      console.error("Error adding document: ", error);
      rej(error);
  });
});

  }



  getBuyerOrder(id)
  {
    var data=[];
    return new Promise((res, rej) => {
      firebase.firestore().collection("soldout").where("buyer", "==", id)
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



  getRepOrder(id)
  {
    var data=[];
    return new Promise((res, rej) => {
      firebase.firestore().collection("soldout").where("rep", "==", id)
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


  addFriends(id=null,data=null)
  {
   
    
      return new Promise((res, rej) => {
        //console.log("Document written with ID: ", data);
        firebase.firestore().collection("friends").doc(id).collection('list').add(data)
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


  removeFriends(id=null,id1=null)
  {
   
    
      return new Promise((res, rej) => {
        //console.log("Document written with ID: ", data);
        firebase.firestore().collection("friends").doc(id).collection('list').doc(id1).delete()
      .then(function() {
         // console.log("Document written with ID: ", docRef);
          res();
        })
      .catch(function(error) {
          console.error("Error adding document: ", error);
          rej(error);
      });
    });
  
     

  }


  acceptFriends(id=null,id1=null)
  {
   
    
      return new Promise((res, rej) => {
        console.log(id,id1);
        firebase.firestore().collection("friends").doc(id).collection('list').doc(id1).update({status:'accepted'})
      .then(function() {
         // console.log("Document written with ID: ", docRef);
          res();
        })
      .catch(function(error) {
          console.error("Error adding document: ", error);
          rej(error);
      });
    });
  
     

  }



  getFriends(id=null,datas=null,from=null)
  {
   
    var data:any=[];
      return new Promise((res, rej) => {
        firebase.firestore().collection("friends").doc(id).collection('list').where("from", "==", from)
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

  getFriendsRequest(id=null,datas=null,from=null)
  {
   
    var data:any=[];
      return new Promise((res, rej) => {
        firebase.firestore().collection("friends").doc(id).collection('list').where("status", "==", "get")
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


  
  getFriendsRequestx(id=null,from=null)
  {
   
    var data:any=[];
      return new Promise((res, rej) => {
        firebase.firestore().collection("friends").doc(id).collection('list').where("status", "==", "sent").where("to", "==", from)
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


  getFriendsRequest1(id=null,datas=null,from=null)
  {
   
    var data:any=[];
      return new Promise((res, rej) => {
        firebase.firestore().collection("friends").doc(id).collection('list').where("status", "==", "get")
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



  getUserById(id=null,datas=null,from=null)
  {
   
    var data:any=[];
      return new Promise((res, rej) => {
        firebase.firestore().collection("users").where("email", "==", id)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
           //console.log(doc.id, " => ", doc.data());
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

  getAcceptedFriends(id=null,from=null)
  {
   
    var data:any=[];
      return new Promise((res, rej) => {
        firebase.firestore().collection("friends").doc(id).collection('list').where("status", "==", "accepted")
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


  addToShareList(data)
  {
let base=this;

    return new Promise((res, rej) => {
      //console.log("Document written with ID: ", data);
      firebase.firestore().collection("shareList").add(data)
    .then(function(docRef) {
       // console.log("Document written with ID: ", docRef);
      data.sharedWith.forEach(element => {
        var dt={
          shareListId:docRef.id,
          email:element
        };
        base.addToShareWithList(dt);
      });
        res(docRef);
      })
    .catch(function(error) {
        console.error("Error adding document: ", error);
        rej(error);
    });
  });

   
  }


  getSharedIfExist(id)
  {

    console.log(id);
    var data:any=[];
    return new Promise((res, rej) => {
      firebase.firestore().collection("shareList").where("shared", "==", id)
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


  getSharedbyid(id)
  {
    var data:any=[];
  
    return new Promise((res, rej) => {
      firebase.firestore().collection("shareList").doc(id)
  .get()
  .then(function(querySnapshot) {
      
      res(querySnapshot);
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
      rej(error);
  });
  });
  }

  getSharedbyidx(id)
  {
    var data:any=[];
  
    return new Promise((res, rej) => {
      firebase.firestore().collection("shareList").doc(id)
  .get()
  .then(function(querySnapshot) {
    if (querySnapshot.exists) {
     // console.log("Document data:", querySnapshot.data());
      res(querySnapshot.data());
  } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      res(null);
  }
     
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
      rej(error);
  });
  });
  }




addToShareWithList(data)
  {


   
      //console.log("Document written with ID: ", data);
      firebase.firestore().collection("sharedWith").add(data)
    .then(function(docRef) {
       // console.log("Document written with ID: ", docRef);
       
      })
    .catch(function(error) {
        console.error("Error adding document: ", error);
       
    });
  

   
  }


  removeshareList(id=null,id1=null)
  {
   
    let base=this;
  
        //console.log("Document written with ID: ", data);
        firebase.firestore().collection("shareList").doc(id).delete()
      .then(function() {
         // console.log("Document written with ID: ", docRef);
        base.getsharewithShareListid(id).then(res=>{
          var rs:any=[];
          rs=res;
          rs.forEach(element => {
            base.removesharewith(element.id);
          });
        });
        
        })
      .catch(function(error) {
          console.error("Error adding document: ", error);
         
      });
  
  
     

  }


  removesharewith(id=null,id1=null)
  {
   
    
     
        //console.log("Document written with ID: ", data);
        firebase.firestore().collection("sharedWith").doc(id).delete()
      .then(function() {
         // console.log("Document written with ID: ", docRef);
        
        })
      .catch(function(error) {
          console.error("Error adding document: ", error);
         
      });
   
  
     

  }




  getsharewithShareListid(id)
  {

var data:any=[];
  
    return new Promise((res, rej) => {
      firebase.firestore().collection("sharedWith").where("shareListId", "==", id)
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




  getShareByMe(id)
  {
    var data:any=[];
    return new Promise((res, rej) => {
      firebase.firestore().collection("shareList").where("sharedByid", "==", id)
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


  
  getSharwithme(id)
  {
    var data:any=[];
    return new Promise((res, rej) => {
      firebase.firestore().collection("sharedWith").where("email", "==", id)
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





  updateuserplan(id,plan)
  {
    return new Promise((res, rej) => {
      console.log(id);
      firebase.firestore().collection("users").doc(id).update(plan)
    .then(function() {
       // console.log("Document written with ID: ", docRef);
        res();
      })
    .catch(function(error) {
        console.error("Error adding document: ", error);
        rej(error);
    });
  });
  }



getPlans(id)
{
  var data:any=[];
  
    return new Promise((res, rej) => {
      firebase.firestore().collection("plans").doc(id)
  .get()
  .then(function(querySnapshot) {
    if (querySnapshot.exists) {
     // console.log("Document data:", querySnapshot.data());
      res(querySnapshot.data());
  } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      res(null);
  }
     
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
      rej(error);
  });
  });
}

getuserbyid(id)
{
  return new Promise((res, rej) => {
    firebase.firestore().collection("users").doc(id)
.get()
.then(function(querySnapshot) {
  if (querySnapshot.exists) {
   // console.log("Document data:", querySnapshot.data());
    res(querySnapshot.data());
} else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    res(null);
}
   
})
.catch(function(error) {
    console.log("Error getting documents: ", error);
    rej(error);
});
});
}


updateplancredits(id,data)
  {
    return new Promise((res, rej) => {
      console.log(id,'----',data);
      firebase.firestore().collection("users").doc(id).update(data)
    .then(function() {
       // console.log("Document written with ID: ", docRef);
        res();
      })
    .catch(function(error) {
        console.error("Error adding document: ", error);
        rej(error);
    });
  });
  }


  getAllPlan()
  {
    var data:any=[];
  
    return new Promise((res, rej) => {
      firebase.firestore().collection("plans")
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




  uuid()
  {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }


  CreateOrder(data)
  {
    return new Promise((res, rej) => {

      //console.log("Document written with ID: ", data);
      firebase.firestore().collection("order").add(data)
    .then(function(docRef) {
       // console.log("Document written with ID: ", docRef);
       res(docRef.id);
      })
    .catch(function(error) {
        console.error("Error adding document: ", error);
       rej(error);
    });

  });
  }

  CreateRepOrder(data)
  {
    return new Promise((res, rej) => {

    console.log("Document written with ID: ", data);
      firebase.firestore().collection("reporder").add(data)
    .then(function(docRef) {
       // console.log("Document written with ID: ", docRef);
       res(docRef.id);
      })
    .catch(function(error) {
        console.error("Error adding document: ", error);
       rej(error);
    });

  });
  }

  fetchorderlist(id)
  {
    var data:any=[];
    return new Promise((res, rej) => {
      firebase.firestore().collection("order").where("buyer", "==", id)
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

  onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}



fetchsoldoutbyid(id)
{
  return new Promise((res, rej) => {
    firebase.firestore().collection("soldout").doc(id)
.get()
.then(function(querySnapshot) {
  if (querySnapshot.exists) {
   // console.log("Document data:", querySnapshot.data());
    res(querySnapshot.data());
} else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    res(null);
}
   
})
.catch(function(error) {
    console.log("Error getting documents: ", error);
    rej(error);
});
});
}






}
