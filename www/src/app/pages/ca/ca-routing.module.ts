import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaPage } from './ca.page';

const routes: Routes = [
  {
    path: '',
    component: CaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaPageRoutingModule {}
