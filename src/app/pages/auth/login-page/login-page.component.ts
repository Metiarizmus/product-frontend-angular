import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../shared/models/user";
import {AuthService} from "../../../shared/service/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form!: FormGroup
  loginRequestUser: User
  notCorrectEmailOrPassword: boolean = false

  constructor(private builder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private toastr: ToastrService,
              private route: ActivatedRoute,
  ) {

    this.loginRequestUser = {
      email:'',
      password: ''
    }

  }

  ngOnInit() {

    this.form = this.builder.group({

      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),

      password: new FormControl('', [
        Validators.required, Validators.minLength(4)
      ])
    });
  }

  login() {
    const formData = {...this.form.value}
    this.loginRequestUser.email = formData.email
    this.loginRequestUser.password = formData.password

    this.authService.login(this.loginRequestUser).subscribe(() => {

        this.toastr.success('Login Successful')

        this.router.navigate(['/main'])

    }, (error => {
      this.notCorrectEmailOrPassword = true
    }))
  }

}
