import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './../model/user';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  urlPrefix = UrlService.prefix;

  constructor(
    private http: HttpClient
  ) { }

  get(userId: number): Observable<User> {
    return this.http.get<User>(`${this.urlPrefix}/users/${userId}`)
  }

  put(user: User): Observable<User> {
    return this.http.put<User>(`/users`, user)
  }
}
