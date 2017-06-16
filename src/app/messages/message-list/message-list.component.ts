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

  /**
   * Prevents from retrieving history when loading a new channel or MPs (we start on top of the window).
   */
  private lockScrollAndResetMessages() {
    this.lock = true;
    this.messageList = [];
    this.reachedEnd = false;
    this.maxPage = 1;
  }

  /**
   * Fonction ngOnInit.
   * Cette fonction est appelée après l"execution de tous les constructeurs de toutes les classes typescript.
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

  /**
   * Updates the message display each time we receive new messages.
   * @param messages the last 20 messages of the current channel or MP
   */
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

  /**
   * Checks if the messages should be displayed or not.
   * This needs to be done because the user might switch channels twice between two refreshes.
   * The messages won't be added in these cases :
   * - in thread mode, if they're from a different thread than the current one;
   * - in MP mode, if they're from an user different than the current nick or the person we're sending the MPs to;
   * - the messages are from an MP and we're in thread mode, or vice-versa.
   * @param messages the messages to analyze
   * @returns {boolean} true if the messages should be displayed in the window, false otherwise
   */
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

  /**
   * Retrieve one page of history from this channel and set up for eventually retrieving the next.
   * Bumps the user down so he can scroll up further to trigger the method again.
   */
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

  /**
   * Detects when we're on top of the window and attempts to retrieve history.
   * @param event the scroll event
   */
  public onScroll(event: Event) {
    if (event.srcElement.scrollTop === 0 && !this.lock) {
      this.retrieveHistory();
    }
  }

  /**
   * Checks whether a message is from an user that is not muted or not.
   * @param message the message to check
   * @returns {boolean} true if the message should be displayed, false otherwise
   */
  public isAllowed(message ?: MessageModel): boolean {
    return localStorage.getItem("m_" + message.from) !== "muted";
  }

}
