import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CaPageRoutingModule } from './ca-routing.module';

import { CaPage } from './ca.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CaPageRoutingModule
  ],
  declarations: [CaPage]
})
export class CaPageModule {}
