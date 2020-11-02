import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompRatingsPage } from './comp-ratings.page';

const routes: Routes = [
  {
    path: '',
    component: CompRatingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompRatingsPageRoutingModule {}
