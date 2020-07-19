import { Location } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Recycle } from '../model/recycle';
import { User } from '../model/user';
import { AuthService } from '../services/auth.service';
import { RatingService } from '../services/rating.service';
import { BadReason } from './../model/badReason';
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
  isLoaded = false;
  isEnd = false;
  @ViewChild(IonSlides) slides: IonSlides;
  user: User;
  modalRef: BsModalRef;
  config = {
    animated: true,
  };
  reason: string;
  selectedRecycle: Recycle;

  constructor(
    private recycleService: RecycleService,
    private userService: UserService,
    private ratingService: RatingService,
    private authService: AuthService,
    private modalService: BsModalService,
    private router: Router,
    private location: Location
  ) { }

  goToMyinfo() {
    this.router.navigate(['/myinfo'])
  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    this.isLoaded = false;
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
      this.recycleService.getAll().subscribe(resp => {
        this.recycles = resp;
        this.recycles.forEach(recycle => {
          this.userService.get(+recycle.userId).subscribe(user => {
            recycle.userId = user;
          })
          this.ratingService.get(recycle.recycleId).subscribe(rating => {
            recycle.rating = rating[0];
          })
        })
        setTimeout(() => {
          this.isLoaded = true;
          this.recycles = this.recycles.filter(recycle => {
            return recycle.rating.userId !== user.userId
          })
          if (this.recycles.length === 0) {
            alert('모든 평가를 마쳤습니다. 잠시 후 다시 평가해주세요')
            this.router.navigate(['/home'])
          }
          // this.slides.lockSwipeToPrev(true);
        }, 300)
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

  next() {
    this.slides.lockSwipeToPrev(true);
    this.getPoint();
    this.slides.isEnd().then(isEnd => {
      if (isEnd) {
        alert('모든 평가를 마쳤습니다. 잠시 후 다시 평가해주세요')
        this.router.navigate(['/home'])
      }
      else {
        this.slides.slideNext();
      }
    })
  }

  getPoint() {
    this.user.point += 2;
    this.userService.put(this.user).subscribe(resp => { })
  }

  good(recycle: Recycle) {
    recycle.rating.good += 1;
    recycle.rating.userId = this.user.userId;
    this.ratingService.estimate(recycle.rating).subscribe(resp => {
      this.setRating();
      this.next();
    });
  }

  badOpen(recycle: Recycle, template: TemplateRef<any>) {
    this.selectedRecycle = recycle;
    this.modalRef = this.modalService.show(template, this.config);
  }

  bad() {
    if (this.reason == '') {
      alert('의견을 작성해주세요')
    } else {
      this.modalRef.hide();
      this.selectedRecycle.rating.bad += 1;
      this.selectedRecycle.rating.userId = this.user.userId;
      this.ratingService.estimate(this.selectedRecycle.rating).subscribe(resp => {
        const badReason = new BadReason(0, this.selectedRecycle.rating.ratingId, this.reason);
        this.ratingService.addBadReason(badReason).subscribe(resp => {
          this.reason = '';
          this.setRating();
          this.next();
        })
      });
    }
  }

  back() {
    this.location.back();
  }
}
