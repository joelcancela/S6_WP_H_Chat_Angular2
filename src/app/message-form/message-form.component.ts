import {Component, OnInit} from "@angular/core";

import {MessageService} from "../../shared/services";
import {MessageModel} from "../../shared/models/MessageModel";
import {UserService} from "../../shared/services/user/user.service";
import {AiService} from "../../shared/services/ai/ai.service";
import {MeteoService} from "../../shared/services/meteo/meteo.service";
import {TranslateService} from "../../shared/services/translate/translate.service";
import {TRAD_TEMPLATE} from "../../shared/constants/regexs";

@Component({
  selector: "app-message-form",
  templateUrl: "./message-form.component.html",
  styleUrls: ["./message-form.component.css"]
})
export class MessageFormComponent implements OnInit {

  public message: MessageModel;


  constructor(private messageService: MessageService, private userService: UserService,
              private translateService: TranslateService, private meteo: MeteoService, private aiService: AiService) {
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
    const messageContent = this.message.content;
    if (messageContent.startsWith("/ia ")) {
      this.messageService.sendMessage(this.message);
      this.aiService.sendRequest(messageContent);
      inputElement.value = "";
      return;
    } else if (this.message.content.startsWith("/meteo ")) {
      this.meteo.getMeteo(this.message.content).then((answer) => {
        console.log(answer);
        this.messageService.sendMessage(new MessageModel(1, answer, this.userService.currentNick,
          new Date().toISOString(), new Date().toISOString(), 1));
        inputElement.value = "";
      });
      return;
    } else if (new RegExp(TRAD_TEMPLATE).test(this.message.content)) {
      this.translateService.translate(this.message.content).then((answer) => {
        console.log(answer);
        this.messageService.sendMessage(new MessageModel(1, answer, this.userService.currentNick,
          new Date().toISOString(), new Date().toISOString(), 1));
        inputElement.value = "";
      });
      return;
    } else {
      this.messageService.sendMessage(this.message);
      inputElement.value = "";
    }
  }

}
