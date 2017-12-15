import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CountryDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-country-details',
  templateUrl: 'country-details.html',
})
export class CountryDetailsPage {

	country: {};  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.country = navParams.get('country');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CountryDetailsPage');
  }

}
