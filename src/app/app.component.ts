import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SessionService } from './session/session.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'หน้าแรก',
      url: '/tabs/home',
      icon: 'home'
    }
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private session: SessionService,
    public alertController: AlertController,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.storage.get('status').then((val) => {
        this.session.status = val || false;
      });


    });
  }
  async logout() {
    this.session.showConfirm("คุณแน่ใจต้องการออกจากระบบใช่หรือไม่ ?").then(rs => {
      if (rs) {
        this.storage.remove('status');
        this.storage.remove('member');
        this.session.status = false;
      }
    });
  }
}

