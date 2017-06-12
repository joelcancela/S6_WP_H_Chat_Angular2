import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChannelModule} from "../channel/channel.module";
import {ChannelListComponent} from "./channel-list.component";
import {ChannelService} from "../../../shared/services/channel/channel.service";

@NgModule({
  imports: [
    CommonModule, ChannelModule
  ],
  declarations: [ChannelListComponent],
  providers: [ChannelService]
})
export class ChannelListModule { }
