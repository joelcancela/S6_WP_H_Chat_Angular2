import {Component, OnInit} from "@angular/core";

import {MessageService} from "../../shared/services";
import {MessageModel} from "../../shared/models/MessageModel";
import {UserService} from "../../shared/services/user/user.service";
import {AiService} from "../../shared/services/ai/ai.service";
import {MeteoService} from "../../shared/services/meteo/meteo.service";
import {TranslateService} from "../../shared/services/translate/translate.service";
import {MessageSchedulerService} from "../../shared/services/messageScheduler/message-scheduler.service";
import {tradTemplate} from "../../shared/constants/regexs";
import {ChannelService} from "../../shared/services/channel/channel.service";

@Component({
  selector: "app-message-form",
  templateUrl: "./message-form.component.html",
  styleUrls: ["./message-form.component.css"]
})
export class MessageFormComponent implements OnInit {

  public message: MessageModel;


  constructor(private messageService: MessageService, private userService: UserService,
              private channelService: ChannelService,
              private translateService: TranslateService, private meteo: MeteoService,
              private aiService: AiService, private messageScheduler: MessageSchedulerService) {
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
   */
  sendMessage() {
    this.message.threadId = this.channelService.currentChannelID;
    const inputElement = <HTMLInputElement>document.getElementById("name");
    const messageContent = this.message.content;
    if (messageContent.startsWith("/ia ")) {
      this.messageService.sendMessage(this.message);
      inputElement.value = "";
      this.aiService.sendRequest(messageContent, this.messageService);
      return;
    } else if (this.message.content.startsWith("/meteo ")) {
      this.meteo.getMeteo(this.message.content).then((answer) => {
        this.messageService.sendMessage(new MessageModel(1, answer, this.userService.currentNick,
          new Date().toISOString(), new Date().toISOString(), this.channelService.currentChannelID));
        inputElement.value = "";
      });
      return;
    } else if (new RegExp(tradTemplate).test(this.message.content)) {
      this.translateService.translate(this.message.content).then((answer) => {
        if (!answer) {
          inputElement.value = " Commande traduction invalide";
        } else {
          this.messageService.sendMessage(new MessageModel(1, answer, this.userService.currentNick,
            new Date().toISOString(), new Date().toISOString(), this.channelService.currentChannelID));
          inputElement.value = "";
        }
      });
      return;
    } else if (this.message.content.startsWith("/schedule ")) {
      this.messageScheduler.scheduleMessage(this.message.content);
      inputElement.value = "";
      return;
    } else {
      this.messageService.sendMessage(this.message);
      inputElement.value = "";
      this.message.content = "";
    }
  }

}
