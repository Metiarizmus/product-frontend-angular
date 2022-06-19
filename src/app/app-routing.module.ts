import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {MainLayoutComponent} from "./shared/layouts/main-layout/main-layout.component";
import {ErrorPageComponent} from "./pages/error-page/error-page.component";
import {LoginPageComponent} from "./pages/auth/login-page/login-page.component";
import {RegistrPageComponent} from "./pages/auth/registr-page/registr-page.component";
import {AuthGuardService} from "./guards/auth-guard.service";
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {HelloPageComponent} from "./pages/hello-page/hello-page.component";
import {AdminPageComponent} from "./pages/admin-page/admin-page.component";
import {CartPageComponent} from "./pages/cart-page/cart-page.component";


const routes: Routes = [

  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/hello', pathMatch: 'full'},
      {path: 'hello', component: HelloPageComponent},
      {path: 'login', component: LoginPageComponent},
      {path: 'registr', component: RegistrPageComponent},
    ]
  },
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/main', pathMatch: 'full'},
      {path: 'main', component: MainPageComponent},
      {path: 'admin', component: AdminPageComponent},
      {path: 'cart', component: CartPageComponent}

    ], canActivate: [AuthGuardService]
  },

  {path: 'error', component: ErrorPageComponent},
  {path: '**', redirectTo: '/error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}



