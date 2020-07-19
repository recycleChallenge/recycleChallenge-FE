import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './../model/user';
import { UrlService } from './url.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlPrefix = UrlService.prefix;

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.urlPrefix}/users?user=1`).pipe(
      map(users => {
        return users[0];
      })
    );
    // return of(new User(1, 'name', 'mail', 'pwd', 0, ''))
  }
}
