import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session/session.service';
import { Storage } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    private subscription: Subscription;
    member = {};
    product = [];
    constructor(
        private router: Router,
        private session: SessionService,
        private storage: Storage,
        private barcodeScanner: BarcodeScanner
    ) {

    }
    ngOnInit() {
        this.subscription = this.router.events.subscribe(async (event: any) => {
            if (event instanceof NavigationEnd && event.url === '/tabs/home') {
                setTimeout(() => {
                    this.storage.get('member').then((val) => {
                        this.member = val;
                        this.loadData(false);
                    });
                }, 100);
            }
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    loadData(isLoading = true) {
        this.session.ajax(this.session.api + "product-get.php", {
        }, isLoading).then((res: any) => {
            if (res.status == true) {
                this.product = res.product;
            } else {
                if (isLoading) this.session.showAlert(res.message);
            }
        }).catch(error => {
            this.session.showAlert(error);
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
