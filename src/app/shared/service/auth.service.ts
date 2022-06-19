import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../models/user";
import {map, Observable} from "rxjs";
import {LoginResponse} from "../../payload/response/login.response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServerUrl = environment.apiBaseUrlAuth;
  public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }


  signup(signupRequestUser: User, selectedFile: any): Observable<any> {

    const payload = new FormData();
    payload.append("user", JSON.stringify(signupRequestUser));
    payload.append("avatar", selectedFile, selectedFile.name);

    return this.httpClient.post(`${this.apiServerUrl}/signup`, payload, {responseType: 'text'})
  }


  login(loginRequestUser: User): Observable<any> {

    return this.httpClient.post<LoginResponse>(`${this.apiServerUrl}/signin`, loginRequestUser)
      .pipe(map(data => {

        localStorage.setItem('accessToken', data.token)
        localStorage.setItem('refreshToken', data.refreshToken)
        localStorage.setItem('expiresAt', String(data.expiresAt))
        localStorage.setItem('email', data.email)
        // @ts-ignore
        localStorage.setItem('roles', data.roles)
        return true;

      }))

  }


  isAuthenticated(): boolean | null {
    let token = localStorage.getItem('accessToken');

    if (token != null) {
      return !this.jwtHelper.isTokenExpired(token);
    }

    return null;

  }
}
