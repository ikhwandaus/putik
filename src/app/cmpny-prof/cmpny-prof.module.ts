import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CmpnyProfPageRoutingModule } from './cmpny-prof-routing.module';

import { CmpnyProfPage } from './cmpny-prof.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CmpnyProfPageRoutingModule
  ],
  declarations: [CmpnyProfPage]
})
export class CmpnyProfPageModule {}
