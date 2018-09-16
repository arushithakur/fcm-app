import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { FCM } from '@ionic-native/fcm';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
  private _fcm: FCM) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      platform.ready().then(() => {
        //Notifications
      //  this._fcm.subscribeToTopic('all');
        this._fcm.getToken().then(token=>{
            console.log(token);
        })
        this._fcm.onNotification().subscribe(data=>{
          if(data.wasTapped){
            console.log("Received in background");
          } else {
            console.log("Received in foreground");
          };
        })
        this._fcm.onTokenRefresh().subscribe(token=>{
          console.log(token);
        });
        //end notifications.
         statusBar.styleDefault();
         splashScreen.hide();
       });
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
