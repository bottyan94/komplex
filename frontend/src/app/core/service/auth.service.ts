import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/models';
import { AlertService } from './alert.service';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private user$ = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private alertService: AlertService, private router: Router) {
    const user = localStorage.getItem('user')
    user ? this.user$.next(JSON.parse(user)) : this.logout();
  }

  async login(username: string, password: string) {
    return this.http.post(environment.apiUrl + 'login', { username: username, password: password })
      .toPromise()
      .then((response) => {
        if (response['success']) {
          const user = response['user'];
          this.alertService.success('Sikeres');
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('userID', user.id.toString())

          this.user$.next(user)
          return response
        } else {
          this.alertService.error('Rossz jelszó, vagy nem létező felhasználó')
        }
      }
      )
  };

  logout(): void {
    localStorage.clear();
    this.user$.next(null);
    this.router.navigateByUrl('/auth');
  }

  getUser() {
    return this.user$.asObservable();
  }
}
