import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  member = {};
  username = "";
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
    this.session.getStorage('member').then(val => {
      this.username = val.username;
      this.loadData();
    });
  }
  loadData() {
    this.session.ajax(this.session.api + "member-get.php", {
      username: this.username,
    }, true).then((res: any) => {
      if (res.status == true) {
        this.member = res.member;
      } else {
        this.session.showAlert(res.message);
      }
    }).catch(error => {
      this.session.showAlert(error); //alert(error);
    });
  }
}
