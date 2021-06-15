import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProdepPage } from "./prodep.page";

const routes: Routes = [
  {
    path: "",
    component: ProdepPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdepPageRoutingModule {}
