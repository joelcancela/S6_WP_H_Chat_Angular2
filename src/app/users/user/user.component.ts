import {Component, Input, OnInit} from "@angular/core";
import {UserModel} from "../../../shared/models/UserModel";
import {UserService} from "../../../shared/services/user/user.service";
import {InfoService} from "../../../shared/services/info/info.service";
import {ChannelService} from "../../../shared/services/channel/channel.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  @Input() user: UserModel;

  constructor(private userService: UserService, private infoService: InfoService,
              private channelService: ChannelService) {
    this.user = new UserModel("test");
  }

  ngOnInit() {
    setTimeout(() => {
      const muteButton = document.getElementById("muteButton-" + this.user);
      if (localStorage.getItem("m_" + this.user) === null) {
        muteButton.textContent = "Mute";
      } else {
        muteButton.textContent = "Unmute";
      }
    }, 1000);
  }

  public muteUser(user: string) {
    const muteButton = document.getElementById("muteButton-" + user);
    if (localStorage.getItem("m_" + user) === "muted") {
      localStorage.removeItem("m_" + user);
      muteButton.textContent = "Mute";
    } else {
      muteButton.textContent = "Unmute";
      localStorage.setItem("m_" + user, "muted");
    }
  }

  loadMP(name: string) {
    this.userService.updateUserMP(name);
    this.infoService.updateTitle("MP: " + name);
    const channel = document.getElementById("channel" + this.channelService.currentChannelID);
    if (channel !== null) {
      channel.classList.remove("current");
    }
    this.channelService.updateChannelID(-1);
  }

}
