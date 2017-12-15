import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions,Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { GsonItems } from '../../app/models/gsonItems';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export class User {
  username: string;
  password: string;
 
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}


@Injectable()
export class AuthServiceProvider {
  private loginUrl = 'http://mobigate.awfatech.com/app_pusakahub/client_loginapp.php';
  currentUser: User;
  gsonItems: GsonItems;

  constructor(public http: Http,private toast: ToastController) {
    console.log('Hello AuthServiceProvider Provider');
  }


  public login(credentials): Observable<GsonItems> {
    // console.log('Your credentials', credentials);
    // console.log('Your credentials username', credentials.username);
    // console.log('Your credentials password', credentials.password);

    if (credentials.username === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {

      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      headers.append('Access-Control-Allow-Origin','*');
      let options = new RequestOptions({ headers: headers });

      let regData = { 
        client_ID:credentials.username,
        client_pass:credentials.password, 
        client_appname:'PUSAKA', 
        idserver:'E000739'
      };
      
      return this.http.post(this.loginUrl, JSON.stringify(regData),options)
      .map(this.extractData)
      .catch(this.handleError);

      // return this.http.post(this.loginUrl, JSON.stringify(regData),options)
      // .subscribe(res => {
      //   this.extractData(res)
      // }, (err) => {
      //   this.handleError(err)
      // });

      // return Observable.create(observer => {
      //   // At this point make a request to your backend to make a real check!
      //   //let access = (credentials.username === "james" && credentials.password === "james");

      //   // return this.http.post(this.loginUrl,regData)
      //   //           .map(this.extractData)
      //   //           .catch(this.handleError);
      //   // observer.next(access);
      //   // observer.complete();
      // });
    }
  }

  private presentToast(msg : string) {
    let toast = this.toast.create({
      message: msg,
      duration: 3000,
      position: 'middle'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }


  private extractData(res: Response) {
    
    let isSuccess: any = JSON.stringify(res.json().status);
    let body = JSON.stringify(res.json().data);
    let msg = JSON.stringify(res.json().msg);

    console.log('xx isSuccess : ',isSuccess)

    //this.gsonItems = new GsonItems(isSuccess,body,msg);
    this.gsonItems.status = status;
    this.gsonItems.body = body;
    this.gsonItems.msg = msg;

    if(isSuccess == 'true'){
      //console.log('login response : ',body)
      //this.presentToast(msg)
    }
    else{
      //console.log('login response Error : Login Error ')
    }
    return this.gsonItems || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }
 
  public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

}
