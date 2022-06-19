import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {User} from "../../../shared/models/user";
import {AuthService} from "../../../shared/service/auth.service";
import {FormValidators} from "../../../validator/form.validators";

@Component({
  selector: 'app-registr-page',
  templateUrl: './registr-page.component.html',
  styleUrls: ['./registr-page.component.scss']
})
export class RegistrPageComponent implements OnInit {

  userRequest: User;
  form!: FormGroup

  constructor(private builder: FormBuilder,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService
  ) {

    this.userRequest = {
      avatar: null,
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  }


  ngOnInit() {

    this.form = this.builder.group({
        firstName: new FormControl('', [
          Validators.required
        ]),
        avatar: new FormControl([]),
        lastName: new FormControl('', [
          Validators.required
        ]),
        email: new FormControl('', [
          Validators.email,
          //FormValidators.uniqEmail as AsyncValidatorFn
        ]),

        password: new FormControl('', [
          Validators.required, Validators.minLength(4)
        ]),
        confirmPassword: new FormControl('', [
          Validators.required])
      }, {
        validators: FormValidators.mustMatch('password', 'confirmPassword')
      }
    )

  }

  selectedFile = null;

  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  signup() {

    this.getDataForm()

    console.log(this.userRequest, this.selectedFile)

    this.authService.signup(this.userRequest, this.selectedFile).subscribe(async (data) => {
        this.toastr.success(data)
        await new Promise(f => setTimeout(f, 1500));

        await this.router.navigate(['/login'],
          {queryParams: {registered: 'true'}})
      }, () => {
        this.toastr.error('Registration Failed! Please try again')
      }
    )

  }


  getDataForm() {
    const formData = {...this.form?.value}
    this.userRequest.firstName = formData.firstName;
    this.userRequest.lastName = formData.lastName;
    this.userRequest.email = formData.email;
    this.userRequest.password = formData.password;
  }


}
