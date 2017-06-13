import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";

import {InfoBarComponent} from "./infobar.component";
import {UserService} from "../../shared/services/user/user.service";
import {InfoService} from "../../shared/services/info/info.service";

@NgModule({
  declarations: [
    InfoBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [InfoBarComponent],
  providers: [UserService, InfoService]
})
export class InfobarModule {
}
