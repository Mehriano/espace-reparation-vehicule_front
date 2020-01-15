import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { UserService } from "src/app/Services/user-service.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-menu",
  templateUrl: "./user-menu.component.html",
  styleUrls: ["./user-menu.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class UserMenuComponent implements OnInit {
  public userImage = "assets/img/users/user.jpg";
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {}
  logout() {
    this.userService.logout();
    this.router.navigate(["/"]);
  }
}
