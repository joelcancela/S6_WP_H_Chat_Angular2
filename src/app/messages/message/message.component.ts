import {Component, Input, OnInit} from "@angular/core";

import {MessageModel} from "../../../shared/models/MessageModel";
import {UserService} from "../../../shared/services/user/user.service";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.css"]
})
export class MessageComponent implements OnInit {

  @Input() message: MessageModel;

  constructor(private userService: UserService) {
    this.message = new MessageModel(0, "Hello!");
  }

  /**
   * Fonction ngOnInit.
   * Cette fonction est appelée après l'execution de tous les constructeurs de toutes les classes typescript.
   * Cette dernière s'avère très utile lorsque l'on souhaite attendre des valeurs venant de d'autres composants.
   * Notre composant qui prend en @Input un message. Les @Input ne sont accessibles uniquement à partir du ngOnInit,
   * pas dans le constructeur. Si vous souhaitez manipuler votre message lors du chargement du composant, vous devez
   * le faire dans le ngOnInit.
   */
  ngOnInit() {
    setTimeout(() => {
      const message = document.getElementById("message" + this.message.id);
      if ( this.message.from === this.userService.currentNick ) {
        if (message !== null) {
          message.classList.add("selfMessage");
        }
      } else {
        if (message !== null) {
          message.classList.remove("selfMessage");
        }
      }
    }, 500);
  }

  getAvatar(pseudo: string): string {
    return "https://robohash.org/" + pseudo;
  }
}


