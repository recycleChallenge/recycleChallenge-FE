import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rating } from '../model/rating';
import { BadReason } from './../model/badReason';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  urlPrefix = UrlService.prefix;

  constructor(
    private http: HttpClient,
  ) { }

  get(recycleId: number): Observable<Rating> {
    return this.http.get<Rating>(`${this.urlPrefix}/ratings?recycleId=${recycleId}`)
  }

  add(rating: Rating) {
    return this.http.post(`${this.urlPrefix}/ratings/`, rating)
  }

  estimate(rating: Rating) {
    return this.http.put(`${this.urlPrefix}/ratings/${rating.ratingId}/`, rating)
  }

  addBadReason(badReason: BadReason) {
    return this.http.post(`${this.urlPrefix}/badReasons/`, badReason)
  }
}
