import {Component, OnInit} from "@angular/core";
import {UserService} from "../../shared/services/user/user.service";

@Component({
  selector: "app-infobar",
  templateUrl: "./infobar.component.html",
  styleUrls: ["./infobar.component.css"]
})
export class InfoBarComponent implements OnInit {
  public info: string;
  public currentPseudo: string;

  constructor(private userService: UserService) {
    this.currentPseudo = this.userService.currentNick;
  }

  ngOnInit() {
  }

  public switchPseudo() {
    const name = <HTMLInputElement>document.getElementById("newNick");
    if (name.value !== "") {
      console.log("Changing nick to " + name.value);
      this.userService.updateNick(name.value);
      this.currentPseudo = name.value;
    }
  }

}
