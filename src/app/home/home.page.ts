import { Component } from '@angular/core';
import { SessionService } from '../session/session.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  member = {};
  product = [];
  constructor(
    private session: SessionService,
    private storage: Storage
  ) {
    this.storage.get('member').then((val) => {
      this.member = val;
      this.loadData();
    });
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
}
