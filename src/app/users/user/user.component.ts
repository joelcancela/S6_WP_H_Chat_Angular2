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
  public userConcat: string;

  constructor(private userService: UserService, private infoService: InfoService,
              private channelService: ChannelService) {
    this.user = new UserModel("test");
  }

  ngOnInit() {
    setTimeout(() => {
      const muteButton = document.getElementById("muteButton-" + this.user);
      if (localStorage.getItem("m_" + this.user) === null) {
        muteButton.innerHTML = "<i class=\"fa fa-microphone-slash fa-2x\" aria-hidden=\"true\"></i>";
      } else {
        muteButton.innerHTML = "<i class=\"fa fa-microphone fa-2x\" aria-hidden=\"true\"></i>";
      }
      // concat users name if too long to be displayed
      this.userConcat = this.user + "";
      if ( this.userConcat.length > 15 ) {
        this.userConcat = this.userConcat.slice(0, 15);
      }
    }, 1000);
  }

  public muteUser(user: string) {
    const muteButton = document.getElementById("muteButton-" + user);
    if (localStorage.getItem("m_" + user) === "muted") {
      localStorage.removeItem("m_" + user);
      muteButton.innerHTML = "<i class=\"fa fa-microphone-slash fa-2x\" aria-hidden=\"true\"></i>";
    } else {
      muteButton.innerHTML = "<i class=\"fa fa-microphone fa-2x\" aria-hidden=\"true\"></i>";
      localStorage.setItem("m_" + user, "muted");
    }
  }

  loadMP(name: string) {
    if (window.innerWidth < 780) {
      this.phoneCloseSidebar();
    }
    this.userService.updateUserMP(name);
    this.infoService.updateTitle("MP: " + name);
    const channel = document.getElementById("channel" + this.channelService.currentChannelID);
    if (channel !== null) {
      channel.classList.remove("current");
    }
    this.channelService.updateChannelID(-1);
  }

  phoneCloseSidebar() {
    document.getElementById("usersSidenav").style.width = "0%";
    document.getElementById("right-sidebar").classList.add("hidden-xs-down");
    document.getElementById("right-sidebar").style.left = "100%";
    document.getElementById("newNick").style.display = "block";
    document.getElementById("typing-zone").style.display = "block";
  }

}
