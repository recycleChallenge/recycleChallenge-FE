import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared.module';
import { StaticsComponent } from './statics.component';

const routes: Routes = [
  {
    path: '',
    component: StaticsComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StaticsComponent]
})
export class StaticsModule { }
