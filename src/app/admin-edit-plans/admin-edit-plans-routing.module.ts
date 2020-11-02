import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminEditPlansPage } from './admin-edit-plans.page';

const routes: Routes = [
  {
    path: '',
    component: AdminEditPlansPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminEditPlansPageRoutingModule {}
