import {Component, OnInit} from "@angular/core";
import {UserService} from "../../shared/services/user/user.service";
import {InfoService} from "../../shared/services/info/info.service";
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {current} from "codelyzer/util/syntaxKind";

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
    this.userService.currentNickUpdate.subscribe(newNick => this.currentPseudo = newNick);
    this.infoService.currentInfoUpdate.subscribe(() => {
      let newInfo = this.infoService.currentInfo;
      if (window.innerWidth < 1200 && newInfo.length > 20) {
        newInfo = newInfo.slice(7, 24) + "(...)";
      } else if (newInfo.length > 37) {
        newInfo = newInfo.slice(0, 37) + "(...)";
      }
      this.info = newInfo;
    });
    if ( window.innerWidth > 1200 ) {
      this.openUsers();
      this.openChannels();
    }
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
    if (window.innerWidth > 1200) {
      document.getElementById("swapButton").style.display = "inline";
    }
  }

  // TODO clean ces deux méthodes [FABIEN]
  openChannels() {
    if ( window.innerWidth > 1200 && window.innerHeight > 780) {
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
      document.getElementById("channelSidenav").style.width = "100%";
      document.getElementById("left-sidebar").classList.remove("hidden-xs-down");
      document.getElementById("newNick").style.display = "none";
      document.getElementById("typing-zone").style.display = "none";
    }
  }

  openUsers() {
    console.log( window.innerWidth + " && " + window.innerHeight);
    if ( window.innerWidth > 1200 && window.innerHeight > 780) {
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
    } else {
      document.getElementById("usersSidenav").style.width = "100%";
      document.getElementById("usersSidenav").style.left = "0%";
      document.getElementById("right-sidebar").style.left = "0%";
      document.getElementById("right-sidebar").classList.remove("hidden-xs-down");
      document.getElementById("newNick").style.display = "none";
      document.getElementById("typing-zone").style.display = "none";
    }
  }
}
