import { Component, OnInit } from '@angular/core';
import { Recycle } from '../model/recycle';
import { Category } from './../model/recycle-item';
import { RecycleService } from './../services/recycle.service';

@Component({
  selector: 'app-recycle-estimate',
  templateUrl: './recycle-estimate.component.html',
  styleUrls: ['./recycle-estimate.component.scss'],
})
export class RecycleEstimateComponent implements OnInit {
  recycles: Recycle[];
  Category = Category;

  constructor(
    private recycleService: RecycleService
  ) { }

  ngOnInit() {
    this.recycleService.getAll().subscribe(resp => {
      this.recycles = resp;
    })
  }

  good(recycle: Recycle) {


  }

  bad(recycle: Recycle) {

  }
}
