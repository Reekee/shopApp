import { Component } from '@angular/core';
import { SessionService } from '../session/session.service';
import { Storage } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    member = {};
    product = [];
    constructor(
        private router: Router,
        private session: SessionService,
        private storage: Storage,
        private barcodeScanner: BarcodeScanner
    ) {
        /*this.storage.get('member').then((val) => {
            this.member = val;
            this.loadData();
        });*/
        this.loadData();
    }
    loadData() {
        this.session.ajax(this.session.api + "product-get.php", {
        }, true).then((res: any) => {
            if (res.status == true) {
                this.product = res.product;
            } else {
                this.session.showAlert("เข้าสู่ระบบไม่สำเร็จ"); //alert("เข้าสู่ระบบไม่สำเร็จ");
            }
        }).catch(error => {
            this.session.showAlert(error); //alert(error);
        });
    }
    addData() {
        this.router.navigateByUrl('/product-add');
    }
    scan() {
        this.barcodeScanner.scan().then(barcodeData => {
            alert(barcodeData.text);
            this.router.navigateByUrl('/product-detail/' + barcodeData.text);
        }).catch(err => {
            this.session.showToast(err);
        });
    }
    viewDetail(product_id) {
        this.router.navigateByUrl('/product-detail/' + product_id);
    }
}
