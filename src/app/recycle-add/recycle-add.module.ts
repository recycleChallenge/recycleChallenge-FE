import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared.module';
import { RecycleAddComponent } from './recycle-add.component';

const routes: Routes = [
  {
    path: '',
    component: RecycleAddComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RecycleAddComponent]
})
export class RecycleAddModule { }
