import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  member_name = "";
  member_lname = "";
  gender_id = "1";
  username = "";
  password = "";
  password2 = "";
  constructor(
    private router: Router,
    private session: SessionService,
  ) { }

  ngOnInit() {
  }
  clear() {
    this.member_name = "";
    this.member_lname = "";
    this.gender_id = "1";
    this.username = "";
    this.password = "";
    this.password2 = "";
  }
  register() {
    this.session.ajax(this.session.api + "register.php", {
      member_name: this.member_name,
      member_lname: this.member_lname,
      gender_id: this.gender_id,
      username: this.username,
      password: this.password,
      password2: this.password2
    }, true).then((res: any) => {
      if (res.status == true) {
        this.session.showAlert(res.message).then(rs => {
          this.router.navigateByUrl('/tabs/home');
        });
      } else {
        this.session.showAlert(res.message);
      }
    }).catch(error => {
      this.session.showAlert(error); //alert(error);
    });
  }
}
