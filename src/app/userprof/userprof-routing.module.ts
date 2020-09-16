import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserprofPage } from './userprof.page';

const routes: Routes = [
  {
    path: '',
    component: UserprofPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserprofPageRoutingModule {}
