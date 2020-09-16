import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserprofPageRoutingModule } from './userprof-routing.module';

import { UserprofPage } from './userprof.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserprofPageRoutingModule
  ],
  declarations: [UserprofPage]
})
export class UserprofPageModule {}
