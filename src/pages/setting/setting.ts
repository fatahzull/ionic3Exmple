import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App,AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage : Storage,
    public app: App,private auth: AuthServiceProvider, private alert : AlertController) {
  }


  logout() {
    console.log('logout');

    //const root = this.app.getRootNav();
    //root.popToRoot();
    this.presentConfirm();
  }

  presentConfirm() {
    let alert = this.alert.create({
      title: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Logout',
          handler: () => {
            console.log('logout clicked');
            this.auth.logout().subscribe(succ => {
              this.storage.clear();
              this.navCtrl.setRoot(LoginPage)
            });

          }
        }
      ]
    });
    alert.present();
  }
  
  pushNoti() {
		console.log('Push Noti');
	}
  

}
