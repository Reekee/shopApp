import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../session/session.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

    constructor(
        private router: Router,
        private session: SessionService,
        private barcodeScanner: BarcodeScanner
    ) { }
    ngOnInit() {
    }
    ionViewWillEnter() {
        if (this.session.status == false) {
            this.session.showAlert("กรุณาเข้าสู่ระบบก่อนใช้งาน").then(rs => {
                this.router.navigateByUrl('/tabs/home');
            });
            return;
        }
    }
    scan() {
        this.barcodeScanner.scan().then(barcodeData => {
            this.session.showAlert(barcodeData);
        }).catch(err => {
            this.session.showToast(err);
        });
    }
}
