import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public status = false;  // ตัวแปรควบคุมการล็อกอิน  // true : ล็อกอินแล้ว , false: ยังไม่ล็อกอิน
  constructor(
    private loadingCtrl: LoadingController,
    private http: HttpClient
  ) { }
  public async ajax(url, data, isloading) {
    let loading: any;
    if (isloading == true) {
      loading = await this.loadingCtrl.create({
        message: "กำลังประมวลผล...",
      });
      await loading.present();
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.http.post(url, JSON.stringify(data), { responseType: 'text' })
          .pipe(
            timeout(5000)
          )
          .subscribe((response: any) => {
            if (isloading == true) { loading.dismiss(); }
            try {
              var rs = JSON.parse(response);
              resolve(rs);
            } catch (e) {
              reject(response);
            }
          }, error => {
            if (isloading == true) { loading.dismiss(); }
            reject("ไม่สามารถติดต่อเครื่องแม่ข่ายได้");
          });
      }, 0);
    });
  }
}
