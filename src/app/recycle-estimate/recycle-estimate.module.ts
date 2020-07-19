import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared.module';
import { RecycleEstimateComponent } from './recycle-estimate.component';

const routes: Routes = [
  {
    path: '',
    component: RecycleEstimateComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RecycleEstimateComponent]
})
export class RecycleEstimateModule { }
