import {Component, Input, OnInit} from "@angular/core";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ChannelService} from "../../../shared/services/channel/channel.service";

@Component({
  selector: "app-channel-modal",
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Ajouter un channel</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="form-group row">
        <div class="col-md-4">
          <label for="channelName">Nom du channel:</label>
        </div>
        <div class="col-md-5">
          <input [(ngModel)]="channelName" type="text" class="form-control" id="channelName"></div>
        <div class="col-md-3">
          <button type="button" class="btn btn-primary btn-sm" (click)="createChannel()">Créer channel</button>
        </div>
      </div>
      <span class="text-danger" *ngIf="isError">{{channelNameSubmitted}} n'est pas disponible</span>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.close('Close click')">Fermer</button>
    </div>
  `
})
export class ChannelModalContentComponent {

  isError = false;
  channelName = "";
  channelNameSubmitted = "";

  constructor(public activeModal: NgbActiveModal, private channelService: ChannelService) {
  }

  createChannel() {
    this.isError = false;g
    this.channelService.addChannel(this.channelName)
      .then(rep => {
        this.refreshChannels();
      })
      .catch(err => this.isError = true);
    this.channelNameSubmitted = this.channelName;
  }

  refreshChannels() {
    this.channelService.resetChannels();
    this.activeModal.dismiss();
  }
}

@Component({
  selector: "app-channel-modal-component",
  templateUrl: "channel-modal.component.html"
})
export class ChannelModalComponent {
  constructor(private modalService: NgbModal) {
  }

  open() {
    const modalRef = this.modalService.open(ChannelModalContentComponent);
    document.getElementById("channelName").focus();
  }

}



