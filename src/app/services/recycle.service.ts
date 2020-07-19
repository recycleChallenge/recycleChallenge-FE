import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { Rating } from './../model/rating';
import { Recycle } from './../model/recycle';
import { RecycleItem } from './../model/recycle-item';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class RecycleService {
  urlPrefix = UrlService.prefix;

  constructor(
    private http: HttpClient
  ) { }

  add(recycle: FormData): Observable<Recycle> {
    return this.http.post<Recycle>(`${this.urlPrefix}/recycles/`, recycle)
  }

  addItems(items: RecycleItem[]) {
    const requests: Observable<any>[] = [];
    items.forEach(item => {
      return requests.push(this.http.post(`${this.urlPrefix}/recycleItems/`, item))
    })
    if (requests.length === 0) return of([]);
    return forkJoin(requests);
  }

  getAll(): Observable<Recycle[]> {
    return this.http.get<Recycle[]>(`${this.urlPrefix}/recycles`)
  }

  estimate(ratingId: number, rating: Rating) {
    return this.http.put(`${this.urlPrefix}/ratings/${ratingId}`, rating)
  }
}
