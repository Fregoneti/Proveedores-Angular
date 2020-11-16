import { Component} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBIyVXICR4wZjybuyjm46bGVuTY6p-G1Z8',
      authDomain: 'comprasapp-6f57a.firebaseapp.com'
    });
  }

}
