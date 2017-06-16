import {Component, OnInit} from "@angular/core";
import {UserService} from "../../../shared/services/";
import {el} from "@angular/platform-browser/testing/src/browser_util";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})
export class UserListComponent implements OnInit {
  public userList: string[];
  private sidebarWidth = 20;

  constructor(private userService: UserService) {
    this.userList = [];
  }

  ngOnInit() {
    this.refreshUsers();
  }

  public refreshUsers() {
    this.userService.getUsers().then(response => {
      this.userList = response;
    });
    setTimeout(() => {
      this.refreshUsers();
    }, 15000);
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

  closeUsers() {
    if ( window.innerWidth > 1200) {
      const width = Number(document.getElementById("content").style.minWidth.replace("%", ""));
      document.getElementById("usersSidenav").style.width = "0";
      document.getElementById("usersSidenav").style.left = 100 + "%";
      document.getElementById("content").style.minWidth = width + this.sidebarWidth + "%";
    } else {
      document.getElementById("usersSidenav").style.width = "0%";
      document.getElementById("right-sidebar").classList.add("hidden-xs-down");
      document.getElementById("right-sidebar").style.left = "100%";
      document.getElementById("newNick").style.display = "block";
      document.getElementById("typing-zone").style.display = "block";
    }
  }
}
