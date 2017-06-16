import {Component, OnInit} from "@angular/core";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../../shared/services/user/user.service";


@Component({
  selector: "app-login-component",
  templateUrl: "login.component.html"
})

export class LoginComponent {
  constructor(private modalService: NgbModal) {
    this.modalService.open(LoginModalContentComponent);
    document.getElementById("nickname").focus();

  }

}

@Component({
  selector: "app-login-content-component",
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Welcome to Le Chat</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="form-group row">
        <div class="col-md-5">
          <label for="nickname">Enter your nickname: </label>
        </div>
        <div class="col-md-7">
          <div class="input-group">
            <input [(ngModel)]="nickname" type="text" class="form-control" id="nickname" (keyup.enter)="chooseNickname()">
            <span class="input-group-btn">
                <button type="button" class="btn btn-primary btn-sm" (click)="chooseNickname()">Let's go!</button>
              </span>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})



export class LoginModalContentComponent {

  nickname;

  constructor(public activeModal: NgbActiveModal, private userService: UserService) {
    this.nickname = localStorage.getItem("nickname") || "username";
  }

  chooseNickname() {
    this.userService.updateNick(this.nickname);
    this.activeModal.close("ok");
  }

}






