///<reference path="channel-modal-content/channel-modal-content.component.ts"/>
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
      <div class="form-group">
        <div class="row">
          <div class="col-md-6"><label for="channelName">Nom du channel:</label>
            <input [(ngModel)]="channelName" type="text" class="form-control" id="channelName"></div>
        </div>
        <div class="row">
          <div class="offset-md-9">
            <button type="button" class="btn btn-primary btn-sm" (click)="createChannel()">Créer channel</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.close('Close click')">Fermer</button>
    </div>
  `
})
export class ChannelModalContent {

  channelName: string = "nouveauChannel";

  constructor(public activeModal: NgbActiveModal, private channelService: ChannelService) {
  }

  createChannel(){//TODO
    this.channelService.addChannel(this.channelName);
  }
}

@Component({
  selector: "channel-modal-component",
  templateUrl: "channel-modal.component.html"
})
export class ChannelModalComponent {
  constructor(private modalService: NgbModal) {
  }

  open() {
    const modalRef = this.modalService.open(ChannelModalContent);
  }

}



