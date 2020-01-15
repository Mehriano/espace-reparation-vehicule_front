import { UserService } from "./user-service.service";
import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(protected router: Router, protected authService: UserService) {}

  canActivate() {
    if (this.authService.isLoggedIn()) return true;

    this.router.navigate(["/login"]);
    return false;
  }
}
