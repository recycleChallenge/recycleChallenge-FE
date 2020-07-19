import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { RatingService } from '../services/rating.service';
import { Rating } from './../model/rating';
import { Category, RecycleItem } from './../model/recycle-item';
import { PhotoService } from './../services/photo.service';
import { RecycleService } from './../services/recycle.service';
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

  constructor(
    private photoService: PhotoService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private recycleServie: RecycleService,
    private router: Router,
    private ratingService: RatingService
  ) { }

  ngOnInit() {
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
      const { items } = this.form.value;
      const { latitude, longitude } = position.coords;
      const recycle = new FormData()
      recycle.append('recycleId', `${0}`);
      recycle.append('userId', `${1}`);
      recycle.append('image', this.file);
      recycle.append('time', moment().format('YYYY-MM-DD HH:mm:ss'));
      recycle.append('lat', `${latitude}`);
      recycle.append('lon', `${longitude}`);
      this.recycleServie.add(recycle).subscribe(recycle => {
        const itemList = (items as RecycleItem[]).map(item => new RecycleItem(0, recycle.recycleId, +Category[item.category], item.count))
        this.recycleServie.addItems(itemList).subscribe(resp => {
          const rating = new Rating(0, recycle.recycleId, 0, 0);
          this.ratingService.add(rating).subscribe(resp => {
            alert('감사합니다 오늘도 지구를 위해 좋은일을 하셨어요');
            this.router.navigate(['/home']);
          })
        })
      })
    });
  }
}
