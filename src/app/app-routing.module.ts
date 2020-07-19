import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'recycle-add',
    loadChildren: () => import('./recycle-add/recycle-add.module').then(m => m.RecycleAddModule)
  },
  {
    path: 'recycle-estimate',
    loadChildren: () => import('./recycle-estimate/recycle-estimate.module').then(m => m.RecycleEstimateModule)
  },
  {
    path: 'myinfo',
    loadChildren: () => import('./myinfo/myinfo.module').then(m => m.MyinfoModule)
  },
  {
    path: 'statics',
    loadChildren: () => import('./statics/statics.module').then(m => m.StaticsModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
