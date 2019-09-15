import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
    { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
    { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
    { path: 'product-detail/:product_id', loadChildren: './product-detail/product-detail.module#ProductDetailPageModule' },
    { path: 'product-add', loadChildren: './product-add/product-add.module#ProductAddPageModule' },
    { path: 'product-edit/:product_id', loadChildren: './product-edit/product-edit.module#ProductEditPageModule' },
    { path: 'set-api', loadChildren: './set-api/set-api.module#SetApiPageModule' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
