import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {MessageService} from "../message/message.service";
import {MessageModel} from "../../models/MessageModel";

@Injectable()
export class AiService {

  urlAPI = "https://api.api.ai/v1/query?v=20150910";
  api_key = "025935b2c0ac4c1eb571fe2ed1ad9426";

  constructor(private http: Http, private messageService: MessageService) {
  }

  sendRequest(message: string, instance: MessageService) {
    const query = message.substr(4, message.length);

    const headers = new Headers({"Content-Type": "application/json"});
    headers.append("Authorization", "Bearer " + this.api_key);
    const options = new RequestOptions({headers: headers});
    const body = {
      "query": [query],
      "timezone": "Europe/Madrid",
      "lang": "fr",
      "sessionId": "1"
    };
    this.http.post(this.urlAPI, body, options)
      .map((res: Response) => res.json())
      .subscribe((value) => this.sendMessage(value.result.fulfillment.speech, instance), (err) =>
        (console.log(err)));
  }


  private sendMessage(speech: string, instance: MessageService) {
    const msg = new MessageModel(1, speech, "aibot", new Date().toISOString(), new Date().toISOString(), 1);
    instance.sendMessage(msg);
  }
}
