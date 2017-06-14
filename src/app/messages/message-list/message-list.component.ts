import {Component, OnInit} from "@angular/core";

import {MessageService} from "../../../shared/services";
import {MessageModel} from "../../../shared/models/MessageModel";
import {ChannelService} from "../../../shared/services/channel/channel.service";
import {UserService} from "../../../shared/services/user/user.service";

@Component({
  selector: "app-message-list",
  templateUrl: "./message-list.component.html",
  styleUrls: ["./message-list.component.css"]
})
export class MessageListComponent implements OnInit {

  public messageList: MessageModel[];
  private maxPage;
  private reachedEnd: boolean;

  constructor(private messageService: MessageService, private channelService: ChannelService,
              private userService: UserService) {
    this.messageList = [];
    this.maxPage = 0;
    this.reachedEnd = false;
  }

  private enableMpMode() {
    this.messageList = [];
    this.messageService.switchToMPMode(this.userService.currentMP, this.userService.currentNick);
    this.messageService.getMessages();
  }

  private enableThreadMode() {
    this.messageList = [];
    this.messageService.switchToThreadMode(this.channelService.currentChannelID);
    this.messageService.getMessages();
  }

  /**
   * Fonction ngOnInit.
   * Cette fonction est appelée après l"execution de tous les constructeurs de toutes les classes typescript.
   * Cette dernière s"avère très utile lorsque l"on souhaite attendre des valeurs venant de d"autres composants.
   * Le composant MessageComponent prend en @Input un message. Les @Input ne sont accessibles uniquement à partir du ngOnInit,
   * pas dans le constructeur.
   * En general, l"utilisation des services dans le NgOnInit est une bonne practice. Le constructeur ne doit servir qu"à
   * l"initialisation simple des variables. Pour plus d"information sur le ngOnInit, il y a un lien dans le README.
   */
  ngOnInit() {
    this.channelService.getChannelNumber().subscribe(() => (this.enableThreadMode()));
    this.userService.currentMPUserUpdate.subscribe(() => (this.enableMpMode()));
    this.userService.currentNickUpdate.subscribe(() => {
      if (this.messageService.mpMode) {
        this.enableMpMode();
      }
    });
    this.messageService.getMessages();
    this.messageService.messageList$.subscribe((messages) => (this.addNewMessages(messages)));
    setTimeout(function () {
      const objDiv = document.getElementById("messages-list");
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 400);
    this.refreshMessages();
  }

  private addNewMessages(messages: MessageModel[]) {
    if (this.messageList === null || this.messageList.length === 0) {
      this.messageList = messages;
    } else if (messages !== null) {
      let i = messages.length - 1;
      const last = this.messageList[this.messageList.length - 1];
      if (last.id === messages[i].id) {
        return;
      }
      while (i > 0 && last.id !== messages[i].id) {
        i--;
      }
      i++;
      while (i < messages.length) {
        this.messageList.push(messages[i]);
        i++;
      }
    }
  }

  refreshMessages() {
    setTimeout(() => {
      this.messageService.getMessages();
      this.refreshMessages();
    }, 2000);
  }

  public retrieveHistory() {
    if (!this.reachedEnd) {
      this.messageService.getHistory(this.maxPage).then((response) => {
        this.messageList = response.slice().reverse().concat(this.messageList);
        if (response.length < 20) {
          this.reachedEnd = true;
        }
        const objDiv = document.getElementById("messages-list");
        objDiv.scrollTop = 30;
      });
      this.maxPage++;
    }
  }

  public onScroll(event: Event) {
    if (event.srcElement.scrollTop === 0) {
      this.retrieveHistory();
    }
  };

}
