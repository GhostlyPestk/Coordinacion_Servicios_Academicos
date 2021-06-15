import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProdpPage } from "./prodp.page";

const routes: Routes = [
  {
    path: "",
    component: ProdpPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdpPageRoutingModule {}
