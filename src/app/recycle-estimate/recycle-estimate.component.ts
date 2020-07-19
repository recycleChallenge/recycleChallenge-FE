import { Component, OnInit } from '@angular/core';
import { Recycle } from '../model/recycle';
import { RatingService } from '../services/rating.service';
import { Category } from './../model/recycle-item';
import { RecycleService } from './../services/recycle.service';
import { UserService } from './../services/user.service';

@Component({
  selector: 'app-recycle-estimate',
  templateUrl: './recycle-estimate.component.html',
  styleUrls: ['./recycle-estimate.component.scss'],
})
export class RecycleEstimateComponent implements OnInit {
  recycles: Recycle[];
  Category = Category;

  constructor(
    private recycleService: RecycleService,
    private userService: UserService,
    private ratingService: RatingService
  ) { }

  ngOnInit() {
    this.recycleService.getAll().subscribe(resp => {
      this.recycles = resp;
      this.recycles.map(recycle => {
        this.userService.get(+recycle.userId).subscribe(user => {
          recycle.userId = user;
        })
        this.ratingService.get(recycle.recycleId).subscribe(rating => {
          recycle.rating = rating[0];
        })
      })
    })
  }

  setRating() {
    this.recycles.map(recycle => {
      this.ratingService.get(recycle.recycleId).subscribe(rating => {
        recycle.rating = rating[0];
      })
    })
  }

  good(recycle: Recycle) {
    recycle.rating.good += 1;
    this.ratingService.estimate(recycle.rating).subscribe(resp => {
      alert('평가완료')
      this.setRating();
    });
  }

  bad(recycle: Recycle) {
    recycle.rating.bad += 1;
    this.ratingService.estimate(recycle.rating).subscribe(resp => {
      alert('평가완료')
      this.setRating();
    });
  }
}
