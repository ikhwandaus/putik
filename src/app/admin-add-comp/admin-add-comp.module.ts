import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminAddCompPageRoutingModule } from './admin-add-comp-routing.module';

import { AdminAddCompPage } from './admin-add-comp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminAddCompPageRoutingModule
  ],
  declarations: [AdminAddCompPage]
})
export class AdminAddCompPageModule {}
