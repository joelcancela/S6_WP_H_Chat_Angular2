import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {UserComponent} from "./user.component";
import {InfoService} from "../../../shared/services/info/info.service";

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [UserComponent],
  providers: [InfoService]
})
export class UserModule {
}
