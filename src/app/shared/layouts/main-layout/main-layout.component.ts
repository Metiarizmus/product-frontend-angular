import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  public isMenuCollapsed = true;
  user!: User
  role!: string
  isLoadUser: boolean = false

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCurrentUser()
    // @ts-ignore
    this.role = localStorage.getItem("roles")
    if (this.role === 'ROLE_ADMIN') {
      this.router.navigate(['/admin']);
    }
  }

  logout() {
    localStorage.clear()
    location.reload()
  }

  getCurrentUser() {
    this.userService.getUser().subscribe(
      (resp) => {
        this.user = resp
        this.isLoadUser = true
      }
    )
  }

}
