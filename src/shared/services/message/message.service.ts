import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {MessageModel} from "../../models/MessageModel";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {serverURL} from "shared/constants/urls";
import {imgURL, instagramURL, tweetURL, youtubeURL} from "../../constants/regexs";
import {isUndefined} from "util";
import {emotes, regEmotes} from "shared/constants/emotes";

@Injectable()
export class MessageService {

  private url: string;
  private route: string;

  public messageList$: ReplaySubject<MessageModel[]>;
  public mpMode: boolean;

  constructor(private http: Http) {
    this.url = serverURL;
    this.messageList$ = new ReplaySubject(1);
    this.messageList$.next([new MessageModel()]);
    this.mpMode = false;
  }

  public switchToThreadMode(id?: number) {
    if (id === -1) {
      return;
    }
    this.mpMode = false;
    this.route = "threads/" + id + "/messages";
  }

  public switchToMPMode(currentMP?: string, currentNick?: string) {
    this.mpMode = true;
    this.route = "users/" + currentMP + "/messages?currentUserId=" + currentNick;
  }

  /**
   * Fetches the last 20 messages of the current route.
   */
  public getMessages() {
    const finalUrl = this.url + this.route;
    this.http.get(finalUrl)
      .subscribe((response) => {
        const messageList = response.json() || [];
        this.analyzeMessageContent(messageList);
        this.pushMessages(messageList);
      });
  }

  /**
   * Fetches the history of the current route.
   * @param page the page number of the request
   */
  public getHistory(page: number): Promise<any> {
    let finalUrl = this.url + this.route;
    if (this.mpMode) {
      finalUrl = finalUrl + "&page=" + page;
    } else {
      finalUrl = finalUrl + "?page=" + page;
    }
    return this.http.get(finalUrl).map((response => {
      const messageList = response.json() || [];
      this.analyzeMessageContent(messageList);
      return messageList;
    })).catch((error: Response | any) => {
      return Observable.throw(error.json());
    }).toPromise();
  }

  /**
   * Sends a message on the current route.
   * @param message the message to send
   */
  public sendMessage(message: MessageModel) {
    if (message.content.trim().length === 0) {
      return;
    }
    const next: MessageModel[] = [message];
    this.messageList$.next(next);
    const headers = new Headers({"Content-Type": "application/json"});
    const options = new RequestOptions({headers: headers});
    this.http.post(this.url + this.route, message, options).map((res: Response) => res.json()).subscribe(
      () => {}, (err) => (console.log(err)));
  }

  /**
   * Checks the messages content for emojis and integrations
   * @param messageList the list of messages to check
   */
  public analyzeMessageContent(messageList?: MessageModel[]) {
    for (let i = 0; i < messageList.length; i++) {
      const messageContent = messageList[i].content;
      if (imgURL.test(messageContent)) {
        messageList[i].imgUrl = this.extractImgUrl(messageContent);
      } else if (youtubeURL.test(messageContent)) {
        messageList[i].ytUrl = this.extractYTURL(messageContent);
      } else if (tweetURL.test(messageContent)) {
        messageList[i].tweet = this.extractTweetURL(messageContent);
      } else if (instagramURL.test(messageContent)) {
        messageList[i].instagram = this.extractInstaURL(messageContent);
      }
      this.replaceEmotes(messageList[i]);
    }
  }

  /**
   * Reverses the order of the message list before pushing it.
   * @param messageList the list of messages
   */
  private pushMessages(messageList: MessageModel[]) {
    if (messageList !== null && messageList.length !== 0) {
      this.messageList$.next(messageList.slice().reverse());
    } else {
      this.messageList$.next([]);
    }
  }

  private extractImgUrl(messageText: string): string {
    let result;
    result = messageText.match(imgURL);
    return result[0];
  }

  private extractYTURL(messageText: string): string {
    const match = messageText.match(youtubeURL);
    const timeReg = /[&|?]t=((\d*)h)?((\d*)m)?(\d+)s/;
    let time;
    match[4] = match[4].replace("\&feature=youtu\.be", "");
    if ((time = match[4].match(timeReg))) {
      const hours = isUndefined(time[2]) ? 0 : time[2];
      const minutes = isUndefined(time[4]) ? 0 : time[4];
      const seconds = (hours * 60 * 60) + (minutes * 60) + (time[5] * 1);
      match[4] = match[4].replace(timeReg, "?start=" + seconds);
    }
    if (match[4].includes("list")) {
      return "https://www.youtube.com/embed/watch?v=" + match[4];
    } else if (match[3].includes("playlist?list=")) {
      return "https://www.youtube.com/embed/playlist?list=" + match[4];
    }
    return "https://www.youtube.com/embed/" + match[4];
  }

  private extractTweetURL(messageText: string): string {
    const match = messageText.match(tweetURL);
    return "http://twitframe.com/show?url=" + match[0];
  }

  private extractInstaURL(messageText: string): string {
    const match = messageText.match(instagramURL);
    return match[1] + "/embed/";
  }

  private replaceEmotes(message: MessageModel) {
    let result;
    for (let i = 0; i < regEmotes.length; i++) {
      while ((result = message.content.match(regEmotes[i])) != null) {
        message.content = message.content.replace(regEmotes[i], emotes[i]);
      }
    }
  }

}
