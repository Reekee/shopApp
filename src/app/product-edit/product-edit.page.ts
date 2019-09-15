import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../session/session.service';
import { Platform, ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
    selector: 'app-product-edit',
    templateUrl: './product-edit.page.html',
    styleUrls: ['./product-edit.page.scss'],
})
export class ProductEditPage implements OnInit {
    product_id = "";
    product_name = "";
    product_detail = "";
    product_price = "";
    product_image = "";
    edit_image = false;
    constructor(
        public platform: Platform,
        private camera: Camera,
        public actionSheetController: ActionSheetController,
        private router: Router,
        private route: ActivatedRoute,
        private session: SessionService
    ) { }
    ngOnInit() {
        this.product_id = this.route.snapshot.paramMap.get("product_id");
        this.loadData();
    }
    loadData() {
        this.session.ajax(this.session.api + "product-get-once.php", {
            product_id: this.product_id,
        }, true).then((res: any) => {
            if (res.status == true) {
                this.product_name = res.product.product_name;
                this.product_detail = res.product.product_detail;
                this.product_price = res.product.product_price;
                this.product_image = res.product.product_image;
                this.edit_image = false;
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
        this.product_image = "";
        this.edit_image = false;
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
                this.product_image = res.file;
                this.edit_image = true;
            } else {
                this.session.showAlert(res.message);
            }
        }).catch(error => {
            this.session.showAlert(error);
        });
    }
    edit() {
        this.session.ajax(this.session.api + "product-edit.php", {
            product_id: this.product_id,
            product_name: this.product_name,
            product_detail: this.product_detail,
            product_price: this.product_price,
            product_image: this.product_image
        }, true).then((res: any) => {
            this.edit_image = false;
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
    ionViewWillLeave() {
        if (this.edit_image == false) return;
        this.session.ajax(this.session.api + 'product-remove-image.php', {
            name: this.product_image
        }, false);
    }
}
