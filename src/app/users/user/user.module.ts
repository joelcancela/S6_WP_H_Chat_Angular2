import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {UserComponent} from "./user.component";

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [UserComponent],
  providers: []
})
export class UserModule {
}
