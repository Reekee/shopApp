import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../session/session.service';

@Component({
    selector: 'app-set-api',
    templateUrl: './set-api.page.html',
    styleUrls: ['./set-api.page.scss'],
})
export class SetApiPage implements OnInit {
    protocol: string = "";
    server: string = "";
    name: string = "";
    isConnect: boolean = false;
    constructor(
        private router: Router,
        private session: SessionService
    ) { }
    ngOnInit() {
        let arr = this.session.api.split('/');
        this.protocol = arr[0];
        this.server = arr[2];
        this.name = "";
        for (let i = 3; i < arr.length; i++) {
            this.name += "/" + arr[i];
        }
    }
    async check() {
        this.isConnect = false;
        let api = this.protocol + "//" + this.server + this.name;
        this.session.ajax(api + 'check-shopapp-api.php', {}, true).then((res: any) => {
            if (res.status == true) {
                this.session.showAlert("ติดต่อได้").then(rs => {
                    this.isConnect = true;
                });
            } else {
                this.session.showAlert("ไม่สามารถติดต่อเครื่องแม่ข่ายได้");
            }
        }).catch(error => {
            this.session.showAlert("ไม่สามารถติดต่อเครื่องแม่ข่ายได้");
        });
    }
    edit() {
        this.isConnect = false;
    }
    submit() {
        let api = this.protocol + "//" + this.server + this.name;
        this.session.api = api;
        this.session.setStorage("api", api);
        this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
    }
}
