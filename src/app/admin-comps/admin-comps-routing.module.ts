import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminCompsPage } from './admin-comps.page';

const routes: Routes = [
  {
    path: '',
    component: AdminCompsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminCompsPageRoutingModule {}
