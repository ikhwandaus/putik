import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminAddPlansPageRoutingModule } from './admin-add-plans-routing.module';

import { AdminAddPlansPage } from './admin-add-plans.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminAddPlansPageRoutingModule
  ],
  declarations: [AdminAddPlansPage]
})
export class AdminAddPlansPageModule {}
