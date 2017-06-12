import {Component, Input, OnInit} from "@angular/core";
import {ChanelModel} from "../../../shared/models/ChannelModel";

@Component({
  selector: "app-channel",
  templateUrl: "./channel.component.html",
  styleUrls: ["./channel.component.css"]
})
export class ChannelComponent implements OnInit {

  @Input() channel: ChanelModel;

  constructor() {
    let date = new Date().toISOString();
    this.channel = new ChanelModel(0, "Général", date, date);
  }

  ngOnInit() {
  }

}
