import {Component, OnInit} from "@angular/core";
import {ChanelModel} from "../../../shared/models/ChannelModel";
import {ChannelService} from "../../../shared/services/channel/channel.service";

@Component({
  selector: "app-channel-list",
  templateUrl: "./channel-list.component.html",
  styleUrls: ["./channel-list.component.css"]
})
export class ChannelListComponent implements OnInit {

  public channelList: ChanelModel[];
  timer: any;

  constructor(private channelService: ChannelService) {
  }

  ngOnInit() {
    this.channelService.retrieveChannels().then(response => {
      this.channelService.updateChannelID(response[0].id);
      this.channelList = response;
    }).catch(error => {
    });


    this.timer = setInterval(() => {
      this.channelService.getChannelPage().then(array => this.updateChannelList(array));
    }, 100);
  }

  updateChannelList(array) {
    if (array.length == 0) {
      clearInterval(this.timer);
      return;
    }
    this.channelList = this.channelList.concat(array);
  }
}
