import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services/auth.guard';
import { RoleGuard } from './services/role.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'homepage',
    loadChildren: () => import('./homepage/homepage.module').then( m => m.HomepagePageModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'companies',
    loadChildren: () => import('./companies/companies.module').then( m => m.CompaniesPageModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import('./schedule/schedule.module').then( m => m.SchedulePageModule)
  },
  {
    path: 'receipts',
    loadChildren: () => import('./receipts/receipts.module').then( m => m.ReceiptsPageModule)
  },
  {
    path: 'locations',
    loadChildren: () => import('./locations/locations.module').then( m => m.LocationsPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'cmpny-prof/:id',
    loadChildren: () => import('./cmpny-prof/cmpny-prof.module').then( m => m.CmpnyProfPageModule)
  },
  {
    path: 'userprof',
    loadChildren: () => import('./userprof/userprof.module').then( m => m.UserprofPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-prof',
    loadChildren: () => import('./edit-prof/edit-prof.module').then( m => m.EditProfPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'comp-plans/:id/:idPlan',
    loadChildren: () => import('./comp-plans/comp-plans.module').then( m => m.CompPlansPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'rate/:id',
    loadChildren: () => import('./rate/rate.module').then( m => m.RatePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'comp-ratings/:id',
    loadChildren: () => import('./comp-ratings/comp-ratings.module').then( m => m.CompRatingsPageModule)
  },
  {
    path: 'admin-home',
    loadChildren: () => import('./admin-home/admin-home.module').then( m => m.AdminHomePageModule),
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'admin-comps',
    loadChildren: () => import('./admin-comps/admin-comps.module').then( m => m.AdminCompsPageModule),
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'admin-comp-profile/:id',
    loadChildren: () => import('./admin-comp-profile/admin-comp-profile.module').then( m => m.AdminCompProfilePageModule),
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'admin-add-comp',
    loadChildren: () => import('./admin-add-comp/admin-add-comp.module').then( m => m.AdminAddCompPageModule),
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'admin-add-plans/:id',
    loadChildren: () => import('./admin-add-plans/admin-add-plans.module').then( m => m.AdminAddPlansPageModule),
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'admin-edit-plans/:id/:idPlan',
    loadChildren: () => import('./admin-edit-plans/admin-edit-plans.module').then( m => m.AdminEditPlansPageModule),
    canActivate: [AuthGuard, RoleGuard]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
