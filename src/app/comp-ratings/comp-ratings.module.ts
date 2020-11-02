import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompRatingsPageRoutingModule } from './comp-ratings-routing.module';

import { CompRatingsPage } from './comp-ratings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompRatingsPageRoutingModule
  ],
  declarations: [CompRatingsPage]
})
export class CompRatingsPageModule {}
