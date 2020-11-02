import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompPlansPage } from './comp-plans.page';

const routes: Routes = [
  {
    path: '',
    component: CompPlansPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompPlansPageRoutingModule {}
