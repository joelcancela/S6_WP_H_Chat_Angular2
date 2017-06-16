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
  private firstChan = true;

  constructor(private channelService: ChannelService) {
  }

  ngOnInit() {
    this.channelService.getChannelList().subscribe(newValue => {
      this.channelList = newValue;
      if (this.firstChan && this.channelList.length > 1) {
        this.channelService.updateChannelID(this.channelList[0].id);
        this.firstChan = false;
      }
    });
  }

  public searchChannels() {
    const search = <HTMLInputElement>document.getElementById("searchbarChannel");
    const strsearch: string = search.value.toLowerCase();
    this.channelList.forEach(function (element) {
      document.getElementById("channel" + element.id).style.display = "block";
      if (!element.name.toLowerCase().includes(strsearch) && strsearch !== "") {
        document.getElementById("channel" + element.id).style.display = "none";
      }
    });
  }

  public refreshChannels() {
    this.channelService.resetChannels();
  }

  public manageDropdown() {
    if (document.getElementById("channelsDropdown").classList.contains("show")) {
      document.getElementById("channelsDropdown").classList.remove("show");
    } else {
      document.getElementById("channelsDropdown").classList.add("show");
    }
  }
}
