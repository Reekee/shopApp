import { Component, ViewChild, NgZone } from '@angular/core';

import { Platform, IonRouterOutlet, ActionSheetController, AlertController, PopoverController, ModalController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SessionService } from './session/session.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    @ViewChild(IonRouterOutlet, { static: false }) routerOutlet: IonRouterOutlet;
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
        private router: Router,
        private zone: NgZone,
        private actionSheetCtrl: ActionSheetController,
        private alertCtrl: AlertController,
        private popoverCtrl: PopoverController,
        private modalCtrl: ModalController,
        private menuCtrl: MenuController,
        private session: SessionService
    ) {
        this.initializeApp();
    }
    regisBackbutton() { // สั่งทำงานเมื่อกดปุ่ม Back button สำหรับแอนดรอย
        this.platform.backButton.subscribeWithPriority(0, async () => {
            this.zone.run(async () => {
                // close action sheet
                try {
                    const element = await this.actionSheetCtrl.getTop();
                    if (element) {
                        element.dismiss();
                        return;
                    }
                } catch (error) {
                }
                // close popover
                try {
                    const element = await this.popoverCtrl.getTop();
                    if (element) {
                        element.dismiss();
                        return;
                    }
                } catch (error) {
                }
                // close alert
                try {
                    const element = await this.alertCtrl.getTop();
                    if (element) {
                        element.dismiss();
                        return;
                    }
                } catch (error) {
                }
                // close modal
                try {
                    const element = await this.modalCtrl.getTop();
                    if (element) {
                        element.dismiss();
                        return;
                    }
                } catch (error) {
                }
                // close side menua
                try {
                    const element = await this.menuCtrl.getOpen();
                    if (element) {
                        this.menuCtrl.close();
                        return;
                    }
                } catch (error) {
                }
                if (this.router.url == "/user") {
                    let rs = await this.session.showConfirm("คุณแน่ใจต้องการปิดแอพใช่ไหม");
                    if (rs) {
                        navigator['app'].exitApp();
                    }
                    return;
                }
                // close page
                if (this.routerOutlet && this.routerOutlet.canGoBack()) {
                    this.routerOutlet.pop();
                } else {
                    let rs = await this.session.showConfirm("คุณแน่ใจต้องการปิดแอพใช่ไหม");
                    if (rs) {
                        navigator['app'].exitApp();
                    }
                }
            });
        });
    }
    initializeApp() {
        this.platform.ready().then(async () => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.regisBackbutton();
            this.session.status = await this.session.getStorage('status') || false;
            let api = await this.session.getStorage("api");
            if (api) this.session.api = api;
            this.session.ajax(this.session.api + 'check-shopapp-api.php', {}, false).then(async (res: any) => {
                if (res.status) {
                    await this.session.setStorage("api", this.session.api);
                    this.run();
                } else {
                    this.router.navigateByUrl('/set-api', { replaceUrl: true });
                }
            }).catch(error => {
                this.router.navigateByUrl('/set-api', { replaceUrl: true });
            });
        });
    }
    run() {
        if (this.router.url == "/" || this.router.url == "/set-api") {
            this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
        }
    }
    async logout() {
        this.session.showConfirm("คุณแน่ใจต้องการออกจากระบบใช่หรือไม่ ?").then(rs => {
            if (rs) {
                this.session.removeStorage("status");
                this.session.removeStorage("member");
                this.session.status = false;
                this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
            }
        });
    }
}

