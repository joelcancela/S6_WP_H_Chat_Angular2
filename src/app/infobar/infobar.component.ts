import {Component, OnInit} from "@angular/core";
import {UserService} from "../../shared/services/user/user.service";
import {InfoService} from "../../shared/services/info/info.service";

@Component({
  selector: "app-infobar",
  templateUrl: "./infobar.component.html",
  styleUrls: ["./infobar.component.css"]
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
      if (newInfo.length > 40) {
        newInfo = newInfo.slice(0, 40) + "...";
      }
      this.info = newInfo;
    });
  }

  public switchPseudo() {
    const name = <HTMLInputElement>document.getElementById("newNick");
    if (name.value !== "") {
      this.userService.updateNick(name.value);
      this.currentPseudo = name.value;
    }
  }

}
