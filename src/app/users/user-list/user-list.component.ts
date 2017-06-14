import {Component, OnInit} from "@angular/core";
import {UserService} from "../../../shared/services/";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  public userList: string[];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUsers().then(response => {
      this.userList = response;
    });
  }

  searchUsers() {
    const search = <HTMLInputElement>document.getElementById("searchbar");
    const strsearch: string = search.value;
    this.userList.forEach(function (element) {
      document.getElementById("user-" + element).style.display = "block";
      if (!element.includes(strsearch) && strsearch !== "") {
        document.getElementById("user-" + element).style.display = "none";
      }
    });
  }
}
