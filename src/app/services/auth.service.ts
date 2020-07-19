import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
    const session = JSON.parse(localStorage.getItem('session'))
    if (!!session) {
      return this.http.get<User>(`${this.urlPrefix}/users?mail=${session['mail']}`).pipe(
        map(users => {
          return users[0];
        })
      );
    } else {
      of(new User(-99, "", "", "", 0, ""))
    }
  }

  login(mail: string, password: string) {
    return this.http.post(`/login`, { mail, password }, { responseType: 'text' }).pipe(
      map(result => {
        return result === 'True'
      })
    );
  }

  logout() {
    localStorage.removeItem('session');
  }

  signup(user: FormData): Observable<User> {
    return this.http.post<User>(`${this.urlPrefix}/users/`, user);
  }
}
