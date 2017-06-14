import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import {MessageModel} from "../../models/MessageModel";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {URLSERVER} from "shared/constants/urls";

@Injectable()
export class MessageService {

  /**
   * Url pour accéder aux données. L'url est commun à toutes les fonctions du service.
   * Il permet d'accéder aux channels. À partir de cet url, vous pourrez accéder aux messages.
   * La documentation des methodes du service permet d'avoir plus d'information concernant la façon d'accèder aux messages.
   */
  private url: string;

  /**
   * MessageList$ est un type d'Observable particulier appelé ReplaySubject.
   * MessageList$ est un flux d'évenements qui stock la liste des messages. A chaque fois que l'on fait une requète
   * pour récupérer la liste des messages, messageList$ va pousser cette nouvelle liste dans son flux pour permettre
   * aux composants qui l'écoutent de récupérer les messages. Pour plus d'infos sur les observables, voir le README.md du projet
   * dans lequel vous trouverez une première explication sur les observables ainsi qu'une vidéo tutoriel.
   */
  public messageList$: ReplaySubject<MessageModel[]>;

  constructor(private http: Http) {
    this.url = URLSERVER;
    this.messageList$ = new ReplaySubject(1);
    this.messageList$.next([new MessageModel()]);
  }

  /**
   * Fonction getMessage.
   * Cette fonction permet de récupérer la liste des messages pour un channel donné. Elle prend en parametre:
   * - route: La route. C'est la fin de l'url. Elle sera concaténée à l'attribut this.url pour former l'url complète.
   *          Pour l'envoie des messages la route doit avoir la structure suivante: :id/messages avec ":id" étant
   *          un nombre entier correspondant à l'identifiant (id) du channel.
   * Exemple de route: 1/messages
   * @param route
   * @returns {Observable<R>}
   */
  public getMessages(route: string) {
    const finalUrl = this.url + route;
    this.http.get(finalUrl)
      .subscribe((response) => this.extractAndUpdateMessageList(response));
  }

  public getHistory(route: string, page: number): Promise<any> {
    const finalUrl = this.url + route + "?page=" + page;
    return this.http.get(finalUrl).map((response => {
      return response.json() || [];
    })).catch((error: Response | any) => {
      return Observable.throw(error.json());
    }).toPromise();
  }

  /**
   * Fonction sendMessage.
   * Cette fonction permet l'envoi d'un message. Elle prend en paramêtre:
   * - route: La route est la fin de l'url. Elle sera concaténée à l'attribut this.url pour former l'url complète. Pour
   *          l'envoie des messages la route doit avoir la structure suivante: :id/messages avec ":id" étant un nombre
   *          entier correspondant à l'identifiant (id) du channel.
   *          Exemple de route: 1/messages
   * - message: Le message à envoyer. Ce message est de type MessageModel.
   * @param route
   * @param message
   */
  public sendMessage(route: string, message: MessageModel) {
    const headers = new Headers({"Content-Type": "application/json"});
    const options = new RequestOptions({headers: headers});
    this.http.post(this.url + route, message, options).map((res: Response) => res.json()).subscribe(
      (response) => {
        this.extractMessageAndGetMessages(response, route);
      },
      (err) => {
        /* this function is executed when there's an ERROR */
      },
      () => {
      }
    );
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
    // Plus d'info sur Response ou sur la fonction .json()? si tu utilises Webstorm,
    // fait CTRL + Click pour voir la déclaration et la documentation
    const messageList = response.json() || []; // ExtractMessage: Si response.json() est undefined ou null,
    for (let i = 0; i < messageList.length; i++) {
      let url;
      if ((url = this.extractImgUrl(messageList[i].content)) != null) {
        messageList[i].imgUrl = url;
      } else if ((url = this.extractYTURL(messageList[i].content)) != null) {
        messageList[i].ytUrl = url;
      } else if ((url = this.extractTweetURL(messageList[i].content)) != null) {
        messageList[i].tweet = url;
      }

      this.replaceEmotes(messageList[i]);
    }
    // messageList prendra la valeur tableau vide: [];
    this.messageList$.next(messageList.slice().reverse()); // On pousse les nouvelles données dans l'attribut messageList$
  }

  /**
   * Fonction extractMessage.
   * Cette fonction permet d'extraire les données reçues à travers les requêtes HTTP. Elle est appelée dans la fonction
   * sendMessage et permet de directement récuperer un MessageModel.
   * Elle va également faire un nouvel appel pour récupérer la liste complete des messages pour pouvoir mettre à jour la
   * liste des messages dans les composants.
   * @param response
   * @param route
   * @returns {any|{}}
   */
  private extractMessageAndGetMessages(response: Response, route: string): MessageModel {
    this.getMessages(route);
    return new MessageModel(); // A remplacer ! On retourne ici un messageModel vide seulement pour que Typescript ne lève pas d'erreur !
  }

  private extractImgUrl(messageText: string): string {
    const reg = new RegExp("https?:\/\/[^ \t\n]*(.jpg|.png|.jpeg|.svg)");
    let result;
    if ((result = messageText.match(reg)) != null) {
      return result[0];
    }
    return null;
  }

  private extractYTURL(messageText: string): string {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\? \t\n]*).*/;
    const match = messageText.match(regExp);
    if (match && match[2].length === 11) {
      return "https://www.youtube.com/embed/" + match[2];
    } else {
      return null;
    }
  }

  private extractTweetURL(messageText: string): string {
    const regExp = /^.*(https?:\/\/twitter.com\/[^ \t\n]+\/status\/[\d]+).*/;
    const match = messageText.match(regExp);
    if (match) {
      return "http://twitframe.com/show?url=" + match[0];
    } else {
      return null;
    }
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

  private setUrl(message: MessageModel, url: string) {
    const headers = new Headers({"Origin": "http://www.jqueryscript.net"});
    const options = new RequestOptions({headers: headers});
    this.http.get(url, options)
      .subscribe(
        (rep) => {
          if (rep.headers.get("Content-Type").startsWith("image")) {
            message.imgUrl = url;
          }
        });
  }
}
