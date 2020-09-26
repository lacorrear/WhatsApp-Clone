import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import Swal from "sweetalert2";

import { Message } from "../interfaces/message.interface";

@Injectable({
  providedIn: "root",
})
export class ChatsService {
  private itemsCollection: AngularFirestoreCollection<Message>;
  public rooms: Observable<any[]>;
  public chats: Message[] = [];

  constructor(private afs: AngularFirestore) {}

  createNewChat() {
    Swal.fire({
      title: "Please enter name for chat",
      input: "text",
      inputPlaceholder: "Enter chat name",
    }).then((value) => {
      if (!value.value) {
        return;
      } else {
        let room: Message = {
          name: value.value,
          timestamp: new Date().getTime(),
          // message: text,
          // uId: this.user.uid,
        };
        return this.afs.collection("rooms").add(room);
      }
    });
  }

  deleteChat(roomId: string) {
    Swal.fire(
      "Are you sure?",
      "You are going to delete this room",
      "warning"
    ).then((data) => {
      return this.afs.collection("rooms").doc(roomId).delete();
    });
  }

  sendMessage(userName: string, text: string, roomId: string) {
    let message: Message = {
      name: userName, // this._authService.user.name,
      message: text,
      timestamp: new Date().getTime(),
      // uId: this.user.uid,
    };
    this.afs
      .collection("rooms")
      .doc(roomId)
      .collection("messages")
      .add(message);
  }

  getRooms() {
    // Return DB doc id https://jsmobiledev.com/article/angularfire-idfield
    this.rooms = this.afs
      .collection("rooms")
      .valueChanges({ idField: "roomIdDb" });
    return this.rooms;
  }

  getRoomById(id: string): Observable<any> {
    const rooms = this.afs.collection("rooms");

    return rooms.snapshotChanges().pipe(
      map((changes) =>
        changes.map(({ payload: { doc } }) => {
          const data = doc.data();
          const id = doc.id;
          return { id, data };
        })
      ),
      map((rooms) => rooms.find((room) => room.id === id))
    );
  }

  loadMessages(roomid: string) {
    this.itemsCollection = this.afs
      .collection("rooms")
      .doc(roomid)
      .collection("messages", (ref) =>
        ref.orderBy("timestamp", "desc").limit(5)
      );
    return this.itemsCollection.valueChanges().pipe(
      map((data: Message[]) => {
        // console.log(data);

        this.chats = [];
        for (let message of data) {
          this.chats.unshift(message);
        }
        return this.chats;
        // this.chats = data;
      })
    );
  }
}
