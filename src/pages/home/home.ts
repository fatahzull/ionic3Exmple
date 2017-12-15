import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Rest } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	countries: string[];
  errorMessage: string;

   constructor(public navCtrl: NavController, public rest: Rest,private storage: Storage,
    private auth: AuthServiceProvider) {
      
	}

	ionViewDidLoad() {

    // set a key/value
    this.storage.set('name', 'james');
    this.getCountries();

  	}

  getCountries() {
    this.rest.getCountries()
       .subscribe(
         countries => this.countries = countries,
         error =>  this.errorMessage = <any>error
         );
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();

      this.countries = [];
      this.getCountries();

    }, 2000);
  }

  itemTapped(event, country) {
        console.log(country);
        this.navCtrl.push('CountryDetailsPage', {
            country: country
        });
  }

  deleteNote(country){

    let index = this.countries.indexOf(country);
    if(index > -1){
        this.countries.splice(index, 1);
    }
  }

}
