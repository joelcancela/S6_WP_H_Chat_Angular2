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
  private sidebarWidth = 20;

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

  /**
   * Filters the channel by name.
   */
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

  closeChannels() {
    if ( window.innerWidth > 1200 ) {
      let width = Number(document.getElementById("content").style.minWidth.replace("%", ""));
      width = width + this.sidebarWidth;
      document.getElementById("content").style.minWidth = width + "%";
      document.getElementById("channelSidenav").style.width = "0";
      document.getElementById("content").style.left = "0%";
    } else {
      document.getElementById("channelSidenav").style.width = "0%";
      document.getElementById("left-sidebar").classList.add("hidden-xs-down");
      document.getElementById("newNick").style.display = "block";
      document.getElementById("typing-zone").style.display = "block";
    }
  }
}
