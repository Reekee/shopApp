import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../session/session.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username = "admin";
  password = "1234";
  constructor(
    private router: Router,
    private session: SessionService,
    private storage: Storage
  ) { }
  ngOnInit() {
  }
  login() {
    this.session.ajax(this.session.api + "login.php", {
      username: this.username,
      password: this.password
    }, true).then((res: any) => {
      if (res.status == true) {
        this.storage.set('status', true);
        this.storage.set('member', res.member);
        this.session.status = true;
        this.router.navigateByUrl('/tabs/home');
      } else {
        this.session.showAlert("เข้าสู่ระบบไม่สำเร็จ"); //alert("เข้าสู่ระบบไม่สำเร็จ");
      }
    }).catch(error => {
      this.session.showAlert(error); //alert(error);
    });
  }
  clear() {
    this.username = "";
    this.password = "";
  }
  register() {
    this.router.navigateByUrl('/register');
  }
}
