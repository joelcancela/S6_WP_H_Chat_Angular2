import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {MessageModel} from "../../models/MessageModel";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {URLSERVER} from "shared/constants/urls";
import {IMGURL, INSTAGRAMURL, TWEETURL, YOUTUBEURL} from "../../constants/regexs";

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
  }

  public switchToThreadMode(id?: number) {
    console.log("Switching to thread mode");
    this.mpMode = false;
    this.route = "threads/" + id + "/messages";
  }

  public switchToMPMode(currentMP?: string, currentNick?: string) {
    console.log("Switching to MP mode");
    this.mpMode = true;
    this.route = "users/" + currentMP + "/messages?currentUserId=" + currentNick;
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
      .subscribe((response) => this.extractAndUpdateMessageList(response),
        (error) => {
        });
  }

  public getHistory(page: number): Promise<any> {
    const finalUrl = this.url + this.route + "?page=" + page;
    return this.http.get(finalUrl).map((response => {
      return response.json() || [];
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
    console.log("post route: " + this.route);
    const headers = new Headers({"Content-Type": "application/json"});
    const options = new RequestOptions({headers: headers});
    this.http.post(this.url + this.route, message, options).map((res: Response) => res.json()).subscribe(
      () => (this.getMessages()), (err) => (console.log(err)));
  }

  /**
   * Fonction extractAndUpdateMessageList.
   * Cette fonction permet d'extraire la liste des messages de la 'response' reçue et ensuite de mettre à jour la liste
   * des message dans l'observable messageList$.
   * Elle est appelée dans la fonction getMessages et permet de directement récuperer une liste de MessageModel. Pour récupérer
   * les données de la reponse, il suffit d'appeler la fonction .json() qui retourne le body de la réponse.
   * @param response
   */
  extractAndUpdateMessageList(response: Response) {
    const messageList = response.json() || [];
    console.log("yop");
    console.dir(messageList);
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
    if (messageList.length !== 0) {
      this.messageList$.next(messageList.slice().reverse());
    }
  }

  private extractImgUrl(messageText: string): string {
    let result;
    result = messageText.match(IMGURL);
    return result[0];
  }

  private extractYTURL(messageText: string): string {
    const match = messageText.match(YOUTUBEURL);
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
    const emotes = [new RegExp(":\\)"), new RegExp(";\\)"), new RegExp(":'\\("), new RegExp(":\\("), new RegExp(":D"),
      new RegExp(":p"), new RegExp("<3"), new RegExp(":o")];
    const rep = ["🙂", "😉", "😢", "☹", "😃", "😛", "💗", "😯"];
    let result;
    for (const i in emotes) {
      if ((result = message.content.match(emotes[i])) != null) {
        message.content = message.content.replace(emotes[i], rep[i]);
      }
    }
  }
}
