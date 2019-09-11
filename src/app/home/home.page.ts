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
  constructor(
    private session: SessionService,
    private storage: Storage
  ) {
    this.storage.get('member').then((val) => {
      this.member = val;
    });
  }
}
