import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProdpPageRoutingModule } from './prodp-routing.module';

import { ProdpPage } from './prodp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProdpPageRoutingModule
  ],
  declarations: [ProdpPage]
})
export class ProdpPageModule {}
