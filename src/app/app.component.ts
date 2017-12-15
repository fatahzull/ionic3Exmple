import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage:any = WelcomePage;
  rootPage: any

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public storage: Storage,) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      // Check if the user has already login
      this.storage.get('isLogin')
      .then((isLogin) => {
        console.log('isLogin : ',isLogin)
        if (isLogin) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = LoginPage;
        }
      });
  
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
