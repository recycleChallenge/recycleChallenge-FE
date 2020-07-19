import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Recycle } from './../model/recycle';
import { Category } from './../model/recycle-item';
import { AuthService } from './../services/auth.service';
import { RecycleService } from './../services/recycle.service';

@Component({
  selector: 'app-myinfo',
  templateUrl: './myinfo.component.html',
  styleUrls: ['./myinfo.component.scss'],
})
export class MyinfoComponent implements OnInit {
  user: User;
  recycles: Recycle[];
  Category = Category

  constructor(
    private authService: AuthService,
    private recycleService: RecycleService,
    private location: Location,
  ) { }

  ngOnInit() {
    // this.setData();
  }

  setData() {
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
      this.recycleService.get(user.userId).subscribe(resp => {
        this.recycles = resp;
        this.recycles.map(recycle => {
          const total = recycle.items.map(item => item.count).reduce((a, b) => +a + +b)
          recycle['total'] = total * 10;
          return recycle;
        })
      })
    })
  }

  goDetail() {
    alert('서비스 준비중입니다. 조금만 기다려주세요.')
  }

  back() {
    this.location.back();
  }

  ionViewDidEnter() {
    this.setData();
  }

  trans() {
    alert('곧 지역화폐 환전 서비스가 출시할 예정입니다. 조금만 기다려주세요.')
  }

}
