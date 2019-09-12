import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../session/session.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  constructor(
    private router: Router,
    private session: SessionService,
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
}
