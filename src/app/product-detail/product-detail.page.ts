import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../session/session.service';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.page.html',
    styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
    product_id = "";
    product = {};
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private session: SessionService
    ) { }
    ngOnInit() {
        //alert(this.product_id);
        this.product_id = this.route.snapshot.paramMap.get("product_id");
        this.loadData();
    }
    loadData() {
        this.session.ajax(this.session.api + "product-get-once.php", {
            product_id: this.product_id
        }, true).then((res: any) => {
            if (res.status == true) {
                this.product = res.product;
            } else {
                this.session.showAlert(res.message).then(rs => {
                    this.router.navigateByUrl('/tabs/home');
                });
            }
        }).catch(error => {
            this.session.showAlert(error); //alert(error);
        });
    }
    edit() {
        this.router.navigateByUrl('/product-edit/' + this.product_id);
    }
    del() {
        this.session.showConfirm("Confirm ?").then(rs => {
            if (rs == true) {
                this.session.ajax(this.session.api + "product-del.php", {
                    product_id: this.product_id
                }, true).then((res: any) => {
                    if (res.status == true) {
                        this.session.showAlert(res.message).then(rs => {
                            this.router.navigateByUrl('/tabs/home');
                        });
                    } else {
                        this.session.showAlert(res.message).then(rs => {
                            this.router.navigateByUrl('/tabs/home');
                        });
                    }
                }).catch(error => {
                    this.session.showAlert(error); //alert(error);
                });
            }
        });
    }
}
