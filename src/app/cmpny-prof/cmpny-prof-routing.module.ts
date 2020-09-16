import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CmpnyProfPage } from './cmpny-prof.page';

const routes: Routes = [
  {
    path: '',
    component: CmpnyProfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmpnyProfPageRoutingModule {}
