import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public status = false;  // ตัวแปรควบคุมการล็อกอิน  // true : ล็อกอินแล้ว , false: ยังไม่ล็อกอิน
  constructor() { }
}
