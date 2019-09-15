import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../session/session.service';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
    selector: 'app-product-add',
    templateUrl: './product-add.page.html',
    styleUrls: ['./product-add.page.scss'],
})
export class ProductAddPage implements OnInit {
    product_name = "";
    product_detail = "";
    product_price = "";
    product_image = "assets/images/default.png";
    constructor(
        public platform: Platform,
        private camera: Camera,
        public actionSheetController: ActionSheetController,
        private router: Router,
        private session: SessionService
    ) { }

    ngOnInit() {
    }
    add() {
        this.session.ajax(this.session.api + "product-add.php", {
            product_name: this.product_name,
            product_detail: this.product_detail,
            product_price: this.product_price,
            product_image: this.product_image
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
    clear() {
        this.product_name = "";
        this.product_detail = "";
        this.product_price = "";
        this.product_image = "assets/images/default.png";
    }
    async addImage() {
        if (this.platform.is("cordova")) {  // เช็คว่าเป็นโทรศัพไหม
            const actionSheet = await this.actionSheetController.create({
                header: 'Albums',
                buttons: [{
                    text: 'เลือกจากอัลบัม',
                    icon: 'photos',
                    handler: () => {
                        this.addCamera(1);
                    }
                }, {
                    text: 'ถ่ายรูป',
                    icon: 'camera',
                    handler: () => {
                        this.addCamera(0);
                    }
                }]
            });
            await actionSheet.present();
        } else { // บนบราวเซอร์
            let input: any = null;
            input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.addEventListener('change', (event: any) => {
                let target: any = event.target;
                let reader: any = new FileReader();
                reader.onload = (e: any) => {
                    let imageBase64: any = e.target.result;
                    this.uploadImageBase64(imageBase64);
                };
                reader.readAsDataURL(target.files[0]);
            });
            input.click();
        }
    }
    addCamera(index) {
        let sourceType;
        let allowEdit;
        if (index == 0) { // Camera
            sourceType = this.camera.PictureSourceType.CAMERA;
            allowEdit = true;
        }
        if (index == 1) { // Album
            sourceType = this.camera.PictureSourceType.SAVEDPHOTOALBUM;
            allowEdit = false;
        }
        const options: CameraOptions = {
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: sourceType,
            allowEdit: allowEdit,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
        }
        this.camera.getPicture(options).then((imageData) => {
            let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.uploadImageBase64(base64Image);
        }, (err) => {
        });
    }
    uploadImageBase64(imageBase64: any) {
        this.session.ajax(this.session.api + 'product-upload-image.php', {
            base64: imageBase64
        }, true).then((res: any) => {
            if (res.status) {
                this.product_image = this.session.api + "fileUpload/" + res.file;
            } else {
                this.session.showAlert(res.message);
            }
        }).catch(error => {
            this.session.showAlert(error);
        });
    }
}
