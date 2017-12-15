import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

	username : string;
	password : string;

  constructor(public navCtrl: NavController, private auth: AuthServiceProvider, private storage : Storage) {

		let info = this.auth.getUserInfo();
    //this.username = info['username'];
		//this.password = info['password'];
		this.getUserInfo()
	}
	
	private getUserInfo(){

		this.storage.get('username').then((val) => {
			console.log('Your username is', val);
			this.username = val
		});
		
		this.storage.get('password').then((val) => {
			console.log('Your password is', val);
			this.password = val
    });
	}


 	navigateToAnotherModule() {
		console.log('Navigating to another module');
	}

	navigateToSameModule() {
		console.log('navigating within same module');
	}

}
