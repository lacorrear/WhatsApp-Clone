import { AuthService } from "./../../services/auth.service";
import { Component, OnInit } from "@angular/core";

import { ChatsService } from "./../../services/chats.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  rooms: any = [];
  user: any = {};

  constructor(
    public _chatsService: ChatsService,
    public _authService: AuthService
  ) {
    this._chatsService.getRooms().subscribe((data: any) => {
      console.log("sidebarC", data);
      this.rooms = data;

      // Saving the last message in each room object
      this.rooms.forEach((element) => {
        _chatsService.loadMessages(element.roomIdDb).subscribe((data) => {
          element.lastMessage = data[data.length - 1].message;
        });
      });

      console.log(this.rooms);
    });

    this.user = _authService.user;
  }

  ngOnInit(): void {}
}
