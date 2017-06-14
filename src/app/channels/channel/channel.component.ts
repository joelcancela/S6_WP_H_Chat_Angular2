import {Component, Input, OnInit} from "@angular/core";
import {ChanelModel} from "../../../shared/models/ChannelModel";
import {ChannelService} from "../../../shared/services/channel/channel.service";
import {InfoService} from "../../../shared/services/info/info.service";
import {isUndefined} from "util";

@Component({
  selector: "app-channel",
  templateUrl: "./channel.component.html",
  styleUrls: ["./channel.component.css"]
})
export class ChannelComponent implements OnInit {

  @Input() channel: ChanelModel;
  private channelNumber: number;

  constructor(private channelService: ChannelService, private infoService: InfoService) {
    const date = new Date().toISOString();
    this.channel = new ChanelModel(this.channelNumber, "Général", date, date);
  }

  ngOnInit() {
    const element = document.getElementById("channel" + this.channelService.currentChannelID);
    if (element == null) {
      this.infoService.updateTitle("Channel ");
    } else {
      element.classList.add("current");
      this.infoService.updateTitle("Channel " + element.innerText);
    }
  }

  switchChannel(id: number) {
    if (id === this.channelService.currentChannelID) {
      return;
    } else if (this.channelService.currentChannelID === -1) {
      this.channelService.updateChannelID(id);
      const channel = document.getElementById("channel" + id);
      channel.classList.add("current");
      this.infoService.updateTitle("Channel " + channel.innerText);
      setTimeout(function () {
        const objDiv = document.getElementById("messages-list");
        objDiv.scrollTop = objDiv.scrollHeight;
      }, 500);
    } else {
      const channelsActive = document.getElementsByClassName("current");
      for (let i = 0; i < channelsActive.length; i++) {
        channelsActive[i].classList.remove("current");
      }
      // let channel = document.getElementById("channel" + this.channelService.currentChannelID);
      // channel.classList.remove("current");
      this.channelService.updateChannelID(id);
      const channel = document.getElementById("channel" + id);
      channel.classList.add("current");
      this.infoService.updateTitle("Channel " + channel.innerText);
      setTimeout(function () {
        const objDiv = document.getElementById("messages-list");
        objDiv.scrollTop = objDiv.scrollHeight;
      }, 500);
    }
  }


}
