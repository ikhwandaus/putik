import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminCompsPageRoutingModule } from './admin-comps-routing.module';

import { AdminCompsPage } from './admin-comps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminCompsPageRoutingModule
  ],
  declarations: [AdminCompsPage]
})
export class AdminCompsPageModule {}
