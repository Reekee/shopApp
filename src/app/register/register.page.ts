import { Component, OnInit } from '@angular/core';

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
  constructor() { }

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
}
