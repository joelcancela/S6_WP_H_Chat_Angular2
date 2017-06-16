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
    if (window.innerWidth < 780) {
      this.phoneCloseSidebar();
    }

    if (id === this.channelService.currentChannelID) {
      return;
    } else if (this.channelService.currentChannelID === -1) {
      this.channelService.updateChannelID(id);
      const channel = document.getElementById("channel" + id);
      channel.classList.add("current");
      this.infoService.updateTitle("Channel " + channel.innerText);
    } else {
      const channelsActive = document.getElementsByClassName("current");
      for (let i = 0; i < channelsActive.length; i++) {
        channelsActive[i].classList.remove("current");
      }
      this.channelService.updateChannelID(id);
      const channel = document.getElementById("channel" + id);
      channel.classList.add("current");
      this.infoService.updateTitle("Channel " + channel.innerText);
    }
  }

  phoneCloseSidebar() {
    document.getElementById("channelSidenav").style.width = "0%";
    document.getElementById("left-sidebar").classList.add("hidden-xs-down");
    document.getElementById("newNick").style.display = "block";
    document.getElementById("typing-zone").style.display = "block";
  }

}
