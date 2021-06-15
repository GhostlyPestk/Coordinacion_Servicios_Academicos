import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProdepPageRoutingModule } from './prodep-routing.module';

import { ProdepPage } from './prodep.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProdepPageRoutingModule
  ],
  declarations: [ProdepPage]
})
export class ProdepPageModule {}
