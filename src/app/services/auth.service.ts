import { Observable } from "rxjs/internal/Observable";
import { ChatsService } from "./chats.service";
import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public user: any = {};
  public token: string = "";

  constructor(
    public auth: AngularFireAuth,
    public router: Router,
    public _chatsService: ChatsService
  ) {
    this.userStatus();
  }

  userStatus() {
    // Listening the status of the authentication
    this.auth.authState.subscribe((appUser: any) => {
      console.log("User status:", appUser);

      if (!appUser) {
        return;
      } else {
        this.user.name = appUser.displayName;
        this.user.photo = appUser.photoURL;
        this.user.uid = appUser.uid;
      }
    });
  }

  login() {
    // You need to set up in firebase Google auth - see whatsApp clone video 8, min 13:05
    this.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then((result: any) => {
        //Token forntend generation
        this.token = result.user.uid;
        localStorage.setItem("token", this.token);
        localStorage.setItem("userName", result.user.displayName);

        // navigate to firts url room
        this._chatsService.getRooms().subscribe((data) => {
          let roomIn = data[0].roomIdDb;
          this.router.navigateByUrl("/room/" + roomIn);
        });

        console.log("SingIn: ", result);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  logout() {
    this.user = {};
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    this.auth.signOut();
    this.router.navigateByUrl("/login");
  }

  isAuthenticated() {
    let tkn = localStorage.getItem("token");
    if (tkn) {
      console.log("User is Authenticated");
      return true;
    } else {
      console.log("User is NOT Authenticated");
      return false;
    }
  }
}
