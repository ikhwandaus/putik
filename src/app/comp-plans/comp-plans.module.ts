import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompPlansPageRoutingModule } from './comp-plans-routing.module';

import { CompPlansPage } from './comp-plans.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompPlansPageRoutingModule
  ],
  declarations: [CompPlansPage]
})
export class CompPlansPageModule {}
