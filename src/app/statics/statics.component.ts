import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { Recycle } from './../model/recycle';
import { Category } from './../model/recycle-item';
import { AuthService } from './../services/auth.service';
import { RecycleService } from './../services/recycle.service';

@Component({
  selector: 'app-statics',
  templateUrl: './statics.component.html',
  styleUrls: ['./statics.component.scss'],
})
export class StaticsComponent implements OnInit {
  user: User;
  recycles: Recycle[];
  Category = Category;
  count = 0;
  localeList = ['서울특별시', '인천광역시', '세종특별자치시', '대전광역시', '대구광역시', '울산광역시', '부산광역시', '광주광역시',
    '경기도', '강원도', '충청북도', '충청남도', '전라북도', '전라남도', '경상북도', '경상남도', '제주특별자치도']
  localeStatics: { locale: string, total: number }[];
  rankStatics: { user: string, total: number }[];
  constructor(
    private authService: AuthService,
    private recycleService: RecycleService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    // this.setData();
  }

  groupBy(items, key) {
    return items.reduce(
      (result, item) => ({
        ...result,
        [item[key]]: [
          ...(result[item[key]] || []),
          item,
        ],
      }),
      {},
    );
  }

  goToMyinfo() {
    this.router.navigate(['/myinfo'])
  }

  back() {
    this.location.back();
  }

  setData() {
    this.count = 0;
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
      this.recycleService.getAll().subscribe(recycles => {
        this.recycles = recycles;
        this.recycles = this.recycles.map(recycle => {
          const count = recycle.items.map(item => item.count).reduce((a, b) => +a + +b)
          recycle['total'] = count;
          this.count += count;
          return recycle;
        })
        const data = this.recycles.map(recycle => {
          return { locale: recycle.locale, total: recycle['total'], user: recycle.userId }
        })
        const groupBy = this.groupBy(data, 'locale');
        this.localeStatics = Object.keys(groupBy).map(locale => {
          const total = groupBy[locale].map(item => item.total).reduce((a, b) => +a + +b)
          return { locale, total };
        })
      })
    })
  }

  ionViewDidEnter() {
    this.setData();
  }

  trans() {

  }
}
