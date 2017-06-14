import {Component, OnInit} from "@angular/core";
import {UserService} from "../../shared/services/user/user.service";
import {InfoService} from "../../shared/services/info/info.service";

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
    document.getElementById("switchbar").style.visibility = "hidden";
    this.infoService.currentInfoUpdate.subscribe(() => {
      this.info = this.infoService.currentInfo;
    });
  }

  switchBar() {
    const element = document.getElementById("pseudo");
    element.parentNode.removeChild(element);
    document.getElementById("switchbar").style.visibility = "visible";
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
      console.log(strname);
      window.location.reload();
    }
  }
}
