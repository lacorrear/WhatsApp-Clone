import { async } from "@angular/core/testing";
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

import { AuthService } from "./../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  isOk: boolean;
  constructor(public _authService: AuthService, public router: Router) {
    this.isOk = _authService.isAuthenticated();
  }

  canActivate() {
    if (this.isOk) {
      console.log("guard TRUE");
      return true;
    } else {
      console.log("guard FALSE");
      this.router.navigateByUrl("/login");
      return false;
    }
  }
}
