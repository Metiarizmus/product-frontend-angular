import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../models/user";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl = environment.apiBaseUrlUser;

  constructor(private httpClient: HttpClient) {
  }

  public getUser(): Observable<User> {

    let email = localStorage.getItem('email');

    return this.httpClient.get<User>(`${this.apiServerUrl}/${email}`);
  }
}
