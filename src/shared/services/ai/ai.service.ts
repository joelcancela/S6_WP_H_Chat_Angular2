import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {MessageService} from "../message/message.service";
import {MessageModel} from "../../models/MessageModel";
import {botKey} from "../../constants/keys";
import {urlBot} from "../../constants/urls";

@Injectable()
export class AiService {
  constructor(private http: Http) {
  }

  /**
   * Sends a request to an AI bot and sends the answer.
   * @param message the message containing the command for the bot
   * @param instance the current instance of the message service usd to send the bot answer later
   */
  sendRequest(message: string, instance: MessageService) {
    const query = message.substr(4, message.length);
    const headers = new Headers({"Content-Type": "application/json"});
    headers.append("Authorization", "Bearer " + botKey);
    const options = new RequestOptions({headers: headers});
    const body = {
      "query": [query],
      "timezone": "Europe/Madrid",
      "lang": "fr",
      "sessionId": "1"
    };
    this.http.post(urlBot, body, options)
      .map((res: Response) => res.json())
      .subscribe((value) => this.sendMessage(value.result.fulfillment.speech, instance), (err) =>
        (console.log(err)));
  }


  private sendMessage(speech: string, instance: MessageService) {
    const msg = new MessageModel(1, speech, "aibot", new Date().toISOString(), new Date().toISOString(), 1);
    instance.sendMessage(msg);
  }
}
