import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminAddCompPage } from './admin-add-comp.page';

const routes: Routes = [
  {
    path: '',
    component: AdminAddCompPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminAddCompPageRoutingModule {}
