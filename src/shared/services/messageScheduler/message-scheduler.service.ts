import {Injectable} from "@angular/core";
import {scheduler_message, scheduler_message_hours} from "../../constants/regexs";
import {ChannelService} from "../channel/channel.service";
import {Http, Headers, Response, RequestOptions} from "@angular/http";
import {serverURL} from "../../constants/urls";
import {MessageModel} from "../../models/MessageModel";
import {UserService} from "../user/user.service";

@Injectable()
export class MessageSchedulerService {

  constructor(private channelService: ChannelService, private http: Http, private userService: UserService) {
  }

  scheduleMessage(content: string) {
    const parse = new RegExp(scheduler_message).exec(content);
    const nameChannel = parse[1];
    const idChannel = this.channelService.getChannelID(nameChannel);
    const dateToSchedule = this.computeDate(parse[2]);
    const messageToSend = parse[3];

    const message = new MessageModel(1, messageToSend, this.userService.currentNick,
      new Date().toISOString(), new Date().toISOString(), idChannel, dateToSchedule);

    const headers = new Headers({"Content-Type": "application/json"});
    const options = new RequestOptions({headers: headers});
    this.http.post(serverURL + "threads/" + idChannel + "/messages", message, options).map((res: Response) => res.json()).subscribe(
      () => {
      }, (err) => (console.log(err)));

  }

  private computeDate(dateToParse: string) {
    const parseHours = new RegExp(scheduler_message_hours).exec(dateToParse);
    const hours = parseHours[1];
    const min = parseHours[2];
    const date = new Date();
    date.setHours(+hours);
    date.setMinutes(+min, 0, 0);
    return date.toISOString();
  }
}
