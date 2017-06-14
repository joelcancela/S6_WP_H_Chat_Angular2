import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {MessageModel} from "../../models/MessageModel";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {URLSERVER} from "shared/constants/urls";
import {IMGURL, INSTAGRAMURL, TWEETURL, YOUTUBEURL} from "../../constants/regexs";
import {isUndefined} from "util";
import {EMOTES, REG_EMOTES} from "shared/constants/emotes";

@Injectable()
export class MessageService {

  /**
   * Url pour accéder aux données. L'url est commun à toutes les fonctions du service.
   * Il permet d'accéder aux channels. À partir de cet url, vous pourrez accéder aux messages.
   * La documentation des methodes du service permet d'avoir plus d'information concernant la façon d'accèder aux messages.
   */
  private url: string;
  private route: string;

  /**
   * MessageList$ est un type d'Observable particulier appelé ReplaySubject.
   * MessageList$ est un flux d'évenements qui stock la liste des messages. A chaque fois que l'on fait une requète
   * pour récupérer la liste des messages, messageList$ va pousser cette nouvelle liste dans son flux pour permettre
   * aux composants qui l'écoutent de récupérer les messages. Pour plus d'infos sur les observables, voir le README.md du projet
   * dans lequel vous trouverez une première explication sur les observables ainsi qu'une vidéo tutoriel.
   */
  public messageList$: ReplaySubject<MessageModel[]>;
  public mpMode: boolean;

  constructor(private http: Http) {
    this.url = URLSERVER;
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
    this.getMessages();
  }

  public switchToMPMode(currentMP?: string, currentNick?: string) {
    this.mpMode = true;
    this.route = "users/" + currentMP + "/messages?currentUserId=" + currentNick;
    this.getMessages();
  }

  /**
   * Fonction getMessage.
   * Cette fonction permet de récupérer la liste des messages pour un channel donné. Elle prend en parametre:
   * - route: La route. C'est la fin de l'url. Elle sera concaténée à l'attribut this.url pour former l'url complète.
   *          Pour l'envoie des messages la route doit avoir la structure suivante: :id/messages avec ":id" étant
   *          un nombre entier correspondant à l'identifiant (id) du channel.
   * Exemple de route: 1/messages
   * @returns {Observable<R>}
   */
  public getMessages() {
    const finalUrl = this.url + this.route;
    this.http.get(finalUrl)
      .subscribe((response) => {
        const messageList = response.json() || [];
        console.dir(messageList);
        this.analyzeMessageContent(messageList);
        this.pushMessages(messageList);
      });
  }

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
   * Fonction sendMessage.
   * Cette fonction permet l'envoi d'un message. Elle prend en paramêtre:
   * @param message Le message à envoyer. Ce message est de type MessageModel.
   */
  public sendMessage(message: MessageModel) {
    const headers = new Headers({"Content-Type": "application/json"});
    const options = new RequestOptions({headers: headers});
    this.http.post(this.url + this.route, message, options).map((res: Response) => res.json()).subscribe(
      () => (this.getMessages()), (err) => (console.log(err)));
  }

  public analyzeMessageContent(messageList?: MessageModel[]) {
    for (let i = 0; i < messageList.length; i++) {
      const messageContent = messageList[i].content;
      if (IMGURL.test(messageContent)) {
        messageList[i].imgUrl = this.extractImgUrl(messageContent);
      } else if (YOUTUBEURL.test(messageContent)) {
        messageList[i].ytUrl = this.extractYTURL(messageContent);
      } else if (TWEETURL.test(messageContent)) {
        messageList[i].tweet = this.extractTweetURL(messageContent);
      } else if (INSTAGRAMURL.test(messageContent)) {
        messageList[i].instagram = this.extractInstaURL(messageContent);
      }
      this.replaceEmotes(messageList[i]);
    }
  }

  private pushMessages(messageList: MessageModel[]) {
    if (messageList !== null && messageList.length !== 0) {
      this.messageList$.next(messageList.slice().reverse());
    } else {
      this.messageList$.next([]);
    }
  }

  private extractImgUrl(messageText: string): string {
    let result;
    result = messageText.match(IMGURL);
    return result[0];
  }

  private extractYTURL(messageText: string): string {
    const match = messageText.match(YOUTUBEURL);
    const timeReg = /[&|?]t=((\d*)h)?((\d*)m)?(\d+)s/;
    let time;
    match[2] = match[2].replace("\&feature=youtu\.be", "");
    console.log(match[2]);
    if ((time = match[2].match(timeReg))) {
      console.log(time);
      const hours = isUndefined(time[2]) ? 0 : time[2];
      const minutes = isUndefined(time[4]) ? 0 : time[4];
      const seconds = (hours * 60 * 60) + (minutes * 60) + (time[5] * 1);
      console.log(seconds);
      match[2] = match[2].replace(timeReg, "?start=" + seconds);
    }
    if (match[2].includes("list")) {
      return "https://www.youtube.com/embed/watch?v=" + match[2];
    } else if (match[1].includes("playlist?list=")) {
      return "https://www.youtube.com/embed/playlist?list=" + match[2];
    }
    return "https://www.youtube.com/embed/" + match[2];
  }

  private extractTweetURL(messageText: string): string {
    const match = messageText.match(TWEETURL);
    return "http://twitframe.com/show?url=" + match[0];
  }

  private extractInstaURL(messageText: string): string {
    const match = messageText.match(INSTAGRAMURL);
    return match[1] + "/embed/";
  }

  private replaceEmotes(message: MessageModel) {
    let result;
    for (let i = 0; i < REG_EMOTES.length; i++) {
      while ((result = message.content.match(REG_EMOTES[i])) != null) {
        message.content = message.content.replace(REG_EMOTES[i], EMOTES[i]);
      }
    }
  }
}
