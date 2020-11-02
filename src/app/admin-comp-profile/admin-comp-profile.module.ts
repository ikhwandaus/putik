import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminCompProfilePageRoutingModule } from './admin-comp-profile-routing.module';

import { AdminCompProfilePage } from './admin-comp-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminCompProfilePageRoutingModule
  ],
  declarations: [AdminCompProfilePage]
})
export class AdminCompProfilePageModule {}
