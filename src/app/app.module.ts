import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";

import { MessageComponent, MessageListComponent } from "./messages";
import { MessageFormComponent } from "./message-form";
import { MessageService } from "../shared/services/message/message.service";
import { ChannelsComponent } from './channels/channels.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageFormComponent,
    MessageListComponent,
    MessageComponent,
    ChannelsComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
