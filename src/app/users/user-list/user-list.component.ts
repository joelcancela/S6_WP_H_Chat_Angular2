import {Component, OnInit} from "@angular/core";
import {UserModel} from "../../../shared/models/UserModel";
import {UserService} from "../../../shared/services/";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  public userList: UserModel[];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUsers().then(response => {
      this.userList = response;
    });
  }

}
