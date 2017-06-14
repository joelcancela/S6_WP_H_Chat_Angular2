import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {AppComponent} from "./app.component";

import {MessageComponent, MessageListComponent} from "./messages";
import {MessageFormComponent} from "./message-form";
import {MessageService} from "../shared/services/message/message.service";
import {ChannelComponent} from "./channels/channel/channel.component";
import {ChannelListComponent} from "./channels/channel-list/channel-list.component";
import {ChannelService} from "../shared/services/channel/channel.service";
import {UserComponent} from "./users/user/user.component";
import {UserListComponent} from "./users/user-list/user-list.component";
import {UserService} from "../shared/services/user/user.service";
import {ChannelModalComponent, ChannelModalContentComponent} from "./channels/channel-modal/channel-modal.component";
import {SafePipe} from "../shared/pipes/safe.pipe";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {InfoBarComponent} from "./infobar/infobar.component";
import { LinkifyPipe } from "../shared/pipes/linkify.pipe";
import {InfoService} from "../shared/services/info/info.service";
import { DateFormatPipe } from "../shared/pipes/date-format.pipe";

@NgModule({
  declarations: [
    AppComponent,
    MessageFormComponent,
    MessageListComponent,
    MessageComponent,
    ChannelComponent,
    ChannelListComponent,
    UserComponent,
    UserListComponent,
    ChannelModalComponent,
    SafePipe,
    ChannelModalContentComponent,
    InfoBarComponent,
    LinkifyPipe,
    DateFormatPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
  ],
  entryComponents: [ChannelModalContentComponent],
  providers: [MessageService, ChannelService, UserService, InfoService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
