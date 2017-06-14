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

  constructor(private userService: UserService, private infoService: InfoService) {
    this.currentPseudo = this.userService.currentNick;
  }

  ngOnInit() {
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
    document.getElementById("swapButton").style.display = "inline";
  }
}
