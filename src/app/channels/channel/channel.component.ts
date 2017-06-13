import {Component, Input, OnInit} from "@angular/core";
import {ChanelModel} from "../../../shared/models/ChannelModel";
import {MessageListComponent} from "../../messages/message-list/message-list.component";
import {ChannelService} from "../../../shared/services/channel/channel.service";

@Component({
  selector: "app-channel",
  templateUrl: "./channel.component.html",
  styleUrls: ["./channel.component.css"]
})
export class ChannelComponent implements OnInit {

  @Input() channel: ChanelModel;
  private channelNumber: number;

  constructor(private channelService: ChannelService) {
    let date = new Date().toISOString();
    this.channel = new ChanelModel(this.channelNumber, "Général", date, date);
  }

  ngOnInit() {
    const element = document.getElementById("channel" + this.channelService.currentChannelID);
    element.classList.add("current");
  }

  switchChannel(id: number) {
    if (id == this.channelService.currentChannelID) {
      return;
    }
    else {
      let channel = document.getElementById("channel" + this.channelService.currentChannelID);
      channel.classList.remove("current");
      this.channelService.updateChannelID(id);
      channel = document.getElementById("channel" + id);
      channel.classList.add("current");
    }
  }

  addChannel(name: string) {//TODO
    this.channelService.addChannel(name);
  }


}
