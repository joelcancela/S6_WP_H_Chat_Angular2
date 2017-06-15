import {Component, Input, OnInit} from "@angular/core";

import {MessageModel} from "../../../shared/models/MessageModel";
import {getComponent} from "@angular/core/src/linker/component_factory_resolver";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.css"]
})
export class MessageComponent implements OnInit {

  @Input() message: MessageModel;

  constructor() {
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
      if (message.getElementsByTagName("iframe").length  + message.getElementsByTagName("img").length  <= 1) {
        message.getElementsByClassName("picturething").item(0).remove();
      }
      if (message.getElementsByClassName("embedTweet").item(0).getElementsByTagName("iframe").length === 0) {
        message.getElementsByClassName("embedTweet").item(0).remove();
      }
    }, 500);
  }

  getAvatar(pseudo: string): string {
    return "https://robohash.org/" + pseudo;
  }
}


