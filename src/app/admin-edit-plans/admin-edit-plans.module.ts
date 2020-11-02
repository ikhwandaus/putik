import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminEditPlansPageRoutingModule } from './admin-edit-plans-routing.module';

import { AdminEditPlansPage } from './admin-edit-plans.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminEditPlansPageRoutingModule
  ],
  declarations: [AdminEditPlansPage]
})
export class AdminEditPlansPageModule {}
