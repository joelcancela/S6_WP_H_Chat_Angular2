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

  constructor(private channelService: ChannelService) {
  }

  ngOnInit() {
    this.channelService.getChannelList().subscribe(newValue => {
      this.channelList = newValue;
      this.channelService.updateChannelID(this.channelList[0].id);
    });
  }
}
