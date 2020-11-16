import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {auth} from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';




@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  


  constructor(private router: Router,
    private activatedRouter: ActivatedRoute, public afAuth: AngularFireAuth,
   
    ) { }

  registroUsuario(userdata) {
    firebase.auth().createUserWithEmailAndPassword(userdata.email, userdata.password)
      .catch(error => {
        console.log(error);
      }
      )
  }

  async loginGoogle(){
    try{
    return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    }catch(error){
      console.log(error);
      
    }
  }


  inicioSesion(userdata) {
    firebase.auth().signInWithEmailAndPassword(userdata.email, userdata.password)
      .then(response => {
        console.log(response);
        this.router.navigate(['/inicio']);
      }).catch(
        error => { console.log(error); }
      )
  }

  isAuthenticated() {
    const user = firebase.auth().currentUser;
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    firebase.auth().signOut();
  }

  GoogleAuth(){
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider)
  }

  AuthLogin(provider):Promise<firebase.auth.UserCredential>{
    return this.afAuth.signInWithPopup(provider);
  }


}