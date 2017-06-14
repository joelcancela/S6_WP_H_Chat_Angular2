import {Component, OnInit} from "@angular/core";

import {MessageService} from "../../shared/services";
import {MessageModel} from "../../shared/models/MessageModel";
import {ChannelService} from "../../shared/services/channel/channel.service";
import {UserService} from "../../shared/services/user/user.service";

@Component({
  selector: "app-message-form",
  templateUrl: "./message-form.component.html",
  styleUrls: ["./message-form.component.css"]
})
export class MessageFormComponent implements OnInit {

  public message: MessageModel;

  constructor(private messageService: MessageService, private channelService: ChannelService,
              private userService: UserService) {
    this.message = new MessageModel(1, "", userService.currentNick, new Date().toISOString(),
      new Date().toISOString(), 1);
  }

  ngOnInit() {
    this.channelService.getChannelNumber().subscribe((channelID) => {
      this.messageService.switchToThreadMode(channelID);
    });
    this.userService.currentMPUserUpdate.subscribe(() => {
      this.messageService.switchToMPMode(this.userService.currentMP, this.userService.currentNick);
    });
    this.userService.currentNickUpdate.subscribe(() => {
      this.message = new MessageModel(1, "", this.userService.currentNick, new Date().toISOString(),
        new Date().toISOString(), 1);
      if (this.messageService.mpMode) {
        this.messageService.switchToMPMode(this.userService.currentMP, this.userService.currentNick);
      }
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
