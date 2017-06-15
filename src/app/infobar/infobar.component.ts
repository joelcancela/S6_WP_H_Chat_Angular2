import {Component, OnInit} from "@angular/core";
import {UserService} from "../../shared/services/user/user.service";
import {InfoService} from "../../shared/services/info/info.service";
import {el} from "@angular/platform-browser/testing/src/browser_util";

@Component({
  selector: "app-infobar",
  templateUrl: "./infobar.component.html",
  styleUrls: ["./infobar.component.css"],
})

export class InfoBarComponent implements OnInit {
  public info: string;
  public currentPseudo: string;
  // Lenght in percent of a sidebar
  private sidebarWidth = 20;

  constructor(private userService: UserService, private infoService: InfoService) {
    this.currentPseudo = this.userService.currentNick;
  }

  ngOnInit() {
    document.getElementById("content").style.minWidth = "100%";
    this.infoService.currentInfoUpdate.subscribe(() => {
      let newInfo = this.infoService.currentInfo;
      if (newInfo.length > 37) {
        newInfo = newInfo.slice(0, 37) + "...";
      }
      this.info = newInfo;
    });
  }

  public switchPseudo() {
    const name = <HTMLInputElement>document.getElementById("newNick");
    let strname: string = name.value;
    const letters = /[^A-Za-z+]/gi;
    strname = strname.replace(letters, "");
    if (strname !== "") {
      strname = strname.toLocaleLowerCase();
      this.userService.updateNick(strname);
      this.currentPseudo = strname;
      console.log("switched name to " + strname);
    }
    document.getElementById("swapButton").style.display = "none";
  }

  displayButton() {
    console.log(window.innerWidth);
    if (window.innerWidth > 780) {
      document.getElementById("swapButton").style.display = "inline";
    }
  }

  openChannels() {
    if ( window.innerWidth > 780) {
      let width = Number(document.getElementById("content").style.minWidth.replace("%", ""));
      if (document.getElementById("channelSidenav").style.width === "" || document.getElementById("channelSidenav").style.width === "0px") {
        width = width - this.sidebarWidth;
        document.getElementById("channelSidenav").style.width = this.sidebarWidth + "%";
        document.getElementById("content").style.minWidth = width + "%";
        document.getElementById("content").style.left = this.sidebarWidth + "%";
      } else {
        width = width + this.sidebarWidth;
        document.getElementById("content").style.minWidth = width + "%";
        document.getElementById("channelSidenav").style.width = "0";
        document.getElementById("content").style.left = "0%";
      }
    } else {

    }
  }

  openUsers() {
    let width = Number(document.getElementById("content").style.minWidth.replace("%", ""));
    if (document.getElementById("usersSidenav").style.width === "" || document.getElementById("usersSidenav").style.width === "0px") {
      width = width - this.sidebarWidth;
      document.getElementById("usersSidenav").style.width = this.sidebarWidth + "%";
      document.getElementById("usersSidenav").style.left = 100 - this.sidebarWidth + "%";
      document.getElementById("content").style.minWidth = width + "%";
      document.getElementById("right-sidebar").style.left = "0";
    } else {
      width = width + this.sidebarWidth;
      document.getElementById("usersSidenav").style.width = "0";
      document.getElementById("usersSidenav").style.left = 100 + "%";
      document.getElementById("content").style.minWidth = width + "%";
    }
  }
}
