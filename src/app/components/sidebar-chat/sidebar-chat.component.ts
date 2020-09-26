import { ChatsService } from "./../../services/chats.service";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-sidebar-chat",
  templateUrl: "./sidebar-chat.component.html",
  styleUrls: ["./sidebar-chat.component.css"],
})
export class SidebarChatComponent implements OnInit {
  @Input() addNewChat: boolean = false; // decorate the property with @Input()
  @Input() roomName?: string = ""; // decorate the property with @Input()
  @Input() lastMessage?: string = ""; // decorate the property with @Input()

  seed: number = Math.floor(Math.random() * 5000);
  imageUrl: string =
    "https://avatars.dicebear.com/api/human/" + this.seed + ".svg";

  constructor(public _chatsService: ChatsService) {}

  ngOnInit(): void {}
}
