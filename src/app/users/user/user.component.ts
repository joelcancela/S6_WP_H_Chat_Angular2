import {Component, Input, OnInit} from "@angular/core";
import {UserModel} from "../../../shared/models/UserModel";
import {UserService} from "../../../shared/services/user/user.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  @Input() user: UserModel;

  constructor(private userService: UserService) {
    this.user = new UserModel("test");
  }

  ngOnInit() {
  }

  loadMP(name: string) {
    this.userService.updateUserMP(name);
  }

}
