import {Injectable} from "@angular/core";
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  constructor() {

  }

  SignUp(email,password):Promise<any>{
    return firebase.auth().createUserWithEmailAndPassword(email,password)
  }

  login(email,password){
    return firebase.auth().signInWithEmailAndPassword(email,password)
  }

  forgotPasswordlink(email){
    return firebase.auth().sendPasswordResetEmail(email)
  }
  changePassword(password){
    return firebase.auth().currentUser.updatePassword(password)
  }
  logout(){
    return firebase.auth().signOut()
  }
}
