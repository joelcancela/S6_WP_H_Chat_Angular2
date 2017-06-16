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
  public lock: boolean;

  constructor(private messageService: MessageService, private channelService: ChannelService,
              private userService: UserService) {
    this.messageList = [];
    this.maxPage = 1;
    this.reachedEnd = false;
    this.lock = false;
  }

  private enableMpMode() {
    this.lockScrollAndResetMessages();
    this.messageService.switchToMPMode(this.userService.currentMP, this.userService.currentNick);
  }

  private enableThreadMode() {
    this.lockScrollAndResetMessages();
    this.messageService.switchToThreadMode(this.channelService.currentChannelID);
  }

  private lockScrollAndResetMessages() {
    this.lock = true;
    this.messageList = [];
    this.reachedEnd = false;
    this.maxPage = 1;
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
    this.enableThreadMode();
    this.channelService.currentChannelUpdate.subscribe(() => {
      if (this.channelService.currentChannelID !== -1) {
        this.enableThreadMode();
      }
    });
    this.userService.currentMPUserUpdate.subscribe(() => {
      this.enableMpMode();
    });
    this.userService.currentNickUpdate.subscribe(() => {
      if (this.messageService.mpMode) {
        this.enableMpMode();
      }
    });
    this.messageService.messageList$.subscribe((messages) => {
      const objDiv = document.getElementById("messages-list");
      if (objDiv.scrollTop + objDiv.offsetHeight > objDiv.scrollHeight - 5) {
        this.scrollDownMessages();
      }
      this.updateMessageList(messages);
    });
    // this.messageService.getMessages();
    this.refreshMessages();
    setTimeout(() => {
      this.scrollDownMessages();
    }, 1600);
  }

  public scrollDownMessages() {
    setTimeout(function () {
      const objDiv = document.getElementById("messages-list");
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 600);
  }

  private updateMessageList(messages: MessageModel[]) {
    if (!this.checkMessagesIntegrity(messages)) {
      return;
    }
    if (this.messageList === null || this.messageList.length === 0) {
      // no messages, we can replace the list directly
      this.messageList = messages;
      return;
    }
    this.addNewMessages(messages);
  }

  private checkMessagesIntegrity(messages: MessageModel[]): boolean {
    if (messages === null || messages.length === 0) {
      return false;
    }
    if (messages[0].threadId !== this.channelService.currentChannelID) {
      // incoherence in ids: either we're in MP mode or the messages are from a wrong channel
      if (this.channelService.currentChannelID !== -1) {
        return false;
      }
      // channel ID of -1 means we're in MP mode
      if (messages[0].from !== this.userService.currentMP && messages[0].from !== this.userService.currentNick) {
        return false;
      }
    }
    return true;
  }

  /**
   * Search backwards through the messages we just got until finding the last message currently displayed.
   * Then add all the new messages after the last message displayed.
   * @param messages the messages received from the server
   */
  private addNewMessages(messages: MessageModel[]) {
    let i = messages.length - 1;
    const last = this.messageList[this.messageList.length - 1];
    if (i === -1 || last.id === messages[i].id) {
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

  refreshMessages() {
    setTimeout(() => {
      this.messageService.getMessages();
      this.refreshMessages();
      this.lock = false;
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
    if (event.srcElement.scrollTop === 0 && !this.lock) {
      this.retrieveHistory();
    }
  }

  public isAllowed(message ?: MessageModel): boolean {
    return localStorage.getItem("m_" + message.from) !== "muted";
  }

}
