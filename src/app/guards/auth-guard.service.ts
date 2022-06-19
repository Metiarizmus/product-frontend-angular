import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";
import {environment} from "../../environments/environment";
import {AuthService} from "../shared/service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {


  public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private router: Router,
              private http: HttpClient,
              private auth: AuthService) {
  }

  canActivate() :boolean {

    if (!this.auth.isAuthenticated()) {
      this.router.navigate(["/login"])
      return false;
    }

    const token = localStorage.getItem("accessToken");
    const isRefreshSuccess = this.refreshingTokens(token);
    if (!isRefreshSuccess) {
      this.router.navigate(["/login"]);
      return false;
    }

    return true;
  }

  private async refreshingTokens(token: string | null): Promise<boolean> {
    const refreshToken: string | null = localStorage.getItem("refreshToken");

    if (!token || !refreshToken) {
      return false;
    }

    const tokenModel = JSON.stringify({ accessToken: token, refreshToken: refreshToken });

    let isRefreshSuccess: boolean;
    try {

      const response = await lastValueFrom(this.http.post(environment.apiBaseUrlAuth + "/refreshToken", tokenModel));
      const newToken = (<any>response).accessToken;
      const newRefreshToken = (<any>response).refreshToken;
      localStorage.setItem("accessToken", newToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      alert("Token renewed successfully Success")
      isRefreshSuccess = true;
    }
    catch (ex) {
      isRefreshSuccess = false;
    }
    return isRefreshSuccess;
  }
}
