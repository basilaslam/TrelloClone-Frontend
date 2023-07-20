import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { BoardsComponent } from "./components/boards/boards.component";
import { AuthGuardService } from "../auth/services/auth-guard.service";
import { BoardsService } from "../shared/services/boards.service";

const router: Routes = [
  {
    path: 'boards',
    component: BoardsComponent,
    canActivate: [AuthGuardService]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(router),
  ],
  declarations: [
    BoardsComponent,
  ],
  providers: [
    BoardsService,
  ],
})
export class BoardsModule {

}