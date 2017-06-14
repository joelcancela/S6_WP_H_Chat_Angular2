import {Component, OnInit} from "@angular/core";

import {MessageService} from "../../shared/services";
import {MessageModel} from "../../shared/models/MessageModel";
import {UserService} from "../../shared/services/user/user.service";

@Component({
  selector: "app-message-form",
  templateUrl: "./message-form.component.html",
  styleUrls: ["./message-form.component.css"]
})
export class MessageFormComponent implements OnInit {

  public message: MessageModel;

  constructor(private messageService: MessageService, private userService: UserService) {
    this.message = new MessageModel(1, "", userService.currentNick, new Date().toISOString(),
      new Date().toISOString(), 1);
  }

  ngOnInit() {
    this.userService.currentNickUpdate.subscribe(() => {
      const inputElement = <HTMLInputElement>document.getElementById("name");
      this.message = new MessageModel(1, inputElement.value, this.userService.currentNick, new Date().toISOString(),
        new Date().toISOString(), 1);
    });
  }

  /**
   * Fonction pour envoyer un message.
   * L'envoi du message se fait à travers la methode sendMessage du service MessageService.
   * Cette méthode prend en paramètre la route pour envoyer un message (:id/messages avec id un entier correspondant à l'id du channel)
   * ainsi que le message à envoyer. Ce dernier correspond à l'objet MessageModel que l'utilisateur rempli à travers l'input.
   */
  sendMessage() {
    const inputElement = <HTMLInputElement>document.getElementById("name");
    this.messageService.sendMessage(this.message);
    inputElement.value = "";
    setTimeout(function () {
      const objDiv = document.getElementById("messages-list");
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 200);

  }
}
