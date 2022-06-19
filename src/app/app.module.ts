import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { LoginPageComponent } from './pages/auth/login-page/login-page.component';
import { RegistrPageComponent } from './pages/auth/registr-page/registr-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthService} from "./shared/service/auth.service";
import {AuthInterceptor} from "./helpers/auth.interceptor";
import { HelloPageComponent } from './pages/hello-page/hello-page.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { CreateProductComponent } from './modal-windows/create-product/create-product.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ListProductsComponent } from './pages/admin-page/list-products/list-products.component';
import { EditProductComponent } from './modal-windows/edit-product/edit-product.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    ErrorPageComponent,
    LoginPageComponent,
    RegistrPageComponent,
    MainPageComponent,
    HelloPageComponent,
    AdminPageComponent,
    CreateProductComponent,
    ProductCardComponent,
    ListProductsComponent,
    EditProductComponent,
    SpinnerComponent,
    CartPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true,
      preventDuplicates: true
    })
  ],
  entryComponents:[
    CreateProductComponent,
    EditProductComponent
  ],

  providers: [
    AuthService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
