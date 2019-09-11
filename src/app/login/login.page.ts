import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../session/session.service';

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
    private session: SessionService
  ) { }
  ngOnInit() {
  }
  login() {
    if (this.username == "admin" && this.password == "1234") {
      //alert("เข้าสู่ระบบสำเร็จ");
      this.session.status = true;
      this.router.navigateByUrl('/home');
    } else {
      alert("เข้าสู่ระบบไม่สำเร็จ");
    }
  }
  clear() {
    this.username = "";
    this.password = "";
  }
}
