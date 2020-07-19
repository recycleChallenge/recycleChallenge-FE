import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared.module';
import { MyinfoComponent } from './myinfo.component';

const routes: Routes = [
  {
    path: '',
    component: MyinfoComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyinfoComponent]
})
export class MyinfoModule { }
