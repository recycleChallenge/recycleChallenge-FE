import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Rating } from '../model/rating';
import { RecycleItem } from '../model/recycle-item';
import { RatingService } from '../services/rating.service';
import { Category } from './../model/recycle-item';
import { User } from './../model/user';
import { AuthService } from './../services/auth.service';
import { PhotoService } from './../services/photo.service';
import { RecycleService } from './../services/recycle.service';
import { UserService } from './../services/user.service';
declare var google;

@Component({
  selector: 'app-recycle-add',
  templateUrl: './recycle-add.component.html',
  styleUrls: ['./recycle-add.component.scss'],
})
export class RecycleAddComponent implements OnInit {
  image: any;
  file: File;
  categoryList = [
    'paper',
    'can',
    'metal',
    'bottle',
    'plastic',
    'styrofoam',
    'vinyl',
    'lamp',
    'battery'
  ]
  form: FormGroup;
  items: FormArray;
  user: User;

  constructor(
    private photoService: PhotoService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private recycleServie: RecycleService,
    private router: Router,
    private ratingService: RatingService,
    private userService: UserService,
    private authSerivce: AuthService
  ) { }

  ngOnInit() {
    this.authSerivce.getCurrentUser().subscribe(user => {
      this.user = user;
    })
    this.form = this.fb.group({
      items: this.fb.array([], Validators.required)
    })
    this.photoService.addNewToGallery().then(resp => {
      this.image = this.sanitizer.bypassSecurityTrustUrl(resp.webviewPath);
      this.file = new File([resp.blob], resp.filepath)
    })
  }

  createItem(category: string) {
    return this.fb.group({
      category: [category, [Validators.required, Validators.max(10000000)]],
      count: [0, [Validators.required, Validators.max(10000000)]],
    });
  }

  addItem(category: string): void {
    this.items = this.form.get('items') as FormArray;
    this.items.push(this.createItem(category));
  }

  minusItem(index: number): void {
    this.items = this.form.get('items') as FormArray;
    this.items.removeAt(index)
  }

  onSelectCategory(category: string) {
    this.addItem(category);
  }

  add() {
    navigator.geolocation.getCurrentPosition((position) => {

      const geocoder = new google.maps.Geocoder;
      var latlng = { lat: position.coords.latitude, lng: position.coords.longitude };
      // var latlng = { lat: 33.510140, lng: 126.521930 }
      geocoder.geocode({ 'location': latlng }, (results, status) => {
        console.log(results, status);
        if (status == "OK") {
          const locale = results[results.length - 2].address_components[0].short_name;
          const { items } = this.form.value;
          const { latitude, longitude } = position.coords;
          const recycle = new FormData()
          recycle.append('recycleId', `${0}`);
          recycle.append('userId', `${this.user.userId}`);
          recycle.append('image', this.file);
          recycle.append('time', moment().format('YYYY-MM-DD HH:mm:ss'));
          recycle.append('lat', `${latitude}`);
          recycle.append('lon', `${longitude}`);
          recycle.append('locale', locale);
          this.recycleServie.add(recycle).subscribe(recycle => {
            const itemList = (items as RecycleItem[]).map(item => new RecycleItem(0, recycle.recycleId, +Category[item.category], item.count))
            this.recycleServie.addItems(itemList).subscribe(resp => {
              const rating = new Rating(0, recycle.recycleId, this.user.userId, 0, 0);
              this.ratingService.add(rating).subscribe(resp => {
                const point = itemList.map(item => item.count).reduce((a, b) => a + b) * 10;
                this.user.point += point;
                this.userService.put(this.user).subscribe(resp => {
                  alert('감사합니다 오늘도 지구를 위해 좋은일을 하셨어요');
                  this.router.navigate(['/home']);
                })
              })
            })
          })
        } else {
          alert('설정에서 위치정보를 켜주세요')
        }
      });
    });
  }
}
