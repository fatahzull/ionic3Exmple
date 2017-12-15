import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { GsonItems } from '../../app/models/gsonItems';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  todo :any = {};
  gsonItems : GsonItems ;

  //registerCredentials = JSON.stringify({username: this.data.username, password : this.data.password});

  constructor(private nav: NavController, private auth: AuthServiceProvider, 
    private alertCtrl: AlertController, private loadingCtrl: LoadingController,private storage: Storage) { 
      this.todo.username = '0195940686'
      this.todo.password = '0195940686'

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    // Your app login API web service call triggers 
    //this.nav.push(TabsPage, {}, {animate: false});

    //this.showLoading()
    this.auth.login(this.todo).subscribe(
      hero=> this.gsonItems= hero,
      function(error) { console.log("Error happened" + error)},
      function() { console.log("the subscription is completed : ")}
  );
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    //alert.present(prompt);
    alert.present();
  }

}
