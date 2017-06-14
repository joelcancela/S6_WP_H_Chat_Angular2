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
  private route: string;

  constructor(private messageService: MessageService, private channelService: ChannelService,
              private userService: UserService) {
    this.message = new MessageModel(1, "", userService.currentNick, new Date().toISOString(),
      new Date().toISOString(), 1);
    this.route = this.channelService.currentChannelID + "/messages";
  }

  ngOnInit() {
    this.channelService.getChannelNumber().subscribe((channelID) => {
      this.updateRoute(channelID);
    });
    this.userService.currentMPUserUpdate.subscribe(() => {
      this.route = "users/" + this.userService.currentMP + "/messages?currentUserId=" + this.userService.currentNick;
    });
    this.userService.currentNickUpdate.subscribe(() => {
      this.route = "users/" + this.userService.currentMP + "/messages?currentUserId=" + this.userService.currentNick;
      this.message = new MessageModel(1, "", this.userService.currentNick, new Date().toISOString(),
        new Date().toISOString(), 1);
    });
  }


  updateRoute(number: number) {
    this.route = "threads/" + number + "/messages";
    this.messageService.getMessages(this.route);
  }

  /**
   * Fonction pour envoyer un message.
   * L'envoi du message se fait à travers la methode sendMessage du service MessageService.
   * Cette méthode prend en paramètre la route pour envoyer un message (:id/messages avec id un entier correspondant à l'id du channel)
   * ainsi que le message à envoyer. Ce dernier correspond à l'objet MessageModel que l'utilisateur rempli à travers l'input.
   */
  sendMessage() {
    const inputElement = <HTMLInputElement>document.getElementById("name");
    this.messageService.sendMessage(this.route, this.message);
    inputElement.value = "";
    setTimeout(function () {
      const objDiv = document.getElementById("messages-list");
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 200);

  }
}
