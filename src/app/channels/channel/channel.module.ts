import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ChannelComponent} from "./channel.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ChannelComponent], exports: [ChannelComponent],
})
export class ChannelModule {
}
