import {Component, Input, OnInit} from "@angular/core";
import {ChanelModel} from "../../../shared/models/ChannelModel";
import {ChannelService} from "../../../shared/services/channel/channel.service";
import {InfoService} from "../../../shared/services/info/info.service";

@Component({
  selector: "app-channel",
  templateUrl: "./channel.component.html",
  styleUrls: ["./channel.component.css"]
})
export class ChannelComponent implements OnInit {

  @Input() channel: ChanelModel;
  private channelNumber: number;

  constructor(private channelService: ChannelService, private infoService: InfoService) {
    let date = new Date().toISOString();
    this.channel = new ChanelModel(this.channelNumber, "Général", date, date);
  }

  ngOnInit() {
    const element = document.getElementById("channel" + this.channelService.currentChannelID);
    element.classList.add("current");
    this.infoService.updateTitle("Channel " + element.innerText);
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
      this.infoService.updateTitle("Channel " + channel.innerText);
      setTimeout(function () {
        var objDiv = document.getElementById("messages-list");
        objDiv.scrollTop = objDiv.scrollHeight;
      }, 500);
    }
  }


}
