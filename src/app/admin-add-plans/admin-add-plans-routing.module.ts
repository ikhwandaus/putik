import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminAddPlansPage } from './admin-add-plans.page';

const routes: Routes = [
  {
    path: '',
    component: AdminAddPlansPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminAddPlansPageRoutingModule {}
