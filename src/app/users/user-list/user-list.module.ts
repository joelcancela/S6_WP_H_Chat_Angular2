import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {UserListComponent} from "./user-list.component";
import {UserModule} from "../user";
import {UserService} from "../../../shared/services";

@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    UserModule
  ],
  exports: [UserListComponent],
  providers: [UserService]
})
export class UserListModule {
}
