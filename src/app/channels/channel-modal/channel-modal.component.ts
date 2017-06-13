///<reference path="channel-modal-content/channel-modal-content.component.ts"/>
import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-channel-modal',
  templateUrl: './channel-modal.component.html',
  styleUrls: ['./channel-modal.component.css']
})
export class ChannelModalComponent  implements OnInit {
  constructor(private modalService: NgbModal) {}

  ngOnInit() {

  }

  onClick(){
    this.modalService.open('Hi tehre!');
  }
}



