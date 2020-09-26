import { AuthService } from "./../../services/auth.service";
import { Message } from "./../../interfaces/message.interface";
import { ChatsService } from "./../../services/chats.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
})
export class ChatComponent implements OnInit {
  inputText: string = "";
  seed: number;
  roomName: string = "";
  roomId: string;

  imageUrl: string = "https://avatars.dicebear.com/api/human/2536.svg";
  userName: string = "";

  messages: Message[] = [];
  lastSeen;

  constructor(
    public _chatsService: ChatsService,
    public _AuthService: AuthService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    this.getRoomId();
    this.userName = localStorage.getItem("userName");
  }

  ngOnInit(): void {}

  resetInput() {
    this.inputText = "";
  }

  getRoomId() {
    // Getting room id from url
    this.activatedRoute.params.subscribe((data) => {
      this._chatsService.getRoomById(data.id).subscribe((room) => {
        this.roomName = room.data.name;
        this.roomId = room.id;

        // Getting chats inside the room
        this.getChats(room.id);

        this.seed = Math.floor(Math.random() * 5000);
        this.imageUrl =
          "https://avatars.dicebear.com/api/human/" + this.seed + ".svg";
      });
    });
  }

  getChats(roomId: string) {
    this._chatsService.loadMessages(roomId).subscribe((data) => {
      // console.log("ponit1:", data);
      this.messages = data;
      length = this.messages.length;

      if (length >= 1) {
        this.lastSeen = new Date(this.messages[length - 1].timestamp);
      } else {
        this.lastSeen = "";
      }
    });
  }

  deleteRoom(roomId: string) {
    this._chatsService.deleteChat(roomId);
    this.router.navigateByUrl("/");
  }
}
