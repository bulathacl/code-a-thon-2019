import { Injectable } from '@angular/core';
import { ApiPaths } from '../../common/system-settings';
import { ApiService } from '../api.service';
import { User } from '../../models/user';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService,
    private authService: AuthService) { }

  login(email: string, password: string) {
    // return this.apiService.post(ApiPaths.auth.controller, ApiPaths.auth.action.login, {email: email, password: password});
    return Observable.create((data) => {
      data.next({
        token: 'test',
        userId: 1,
        username: 'chalith',
        userMobile: '00000000',
        expiation: 360000
      });
      data.complete();
    });
  }

  register(user: User, password: string) {
    return this.apiService.post(ApiPaths.auth.controller, ApiPaths.auth.action.insertuser, { user: user, password: password });
  }

  getUser() {
    return this.apiService.get(ApiPaths.user.controller, ApiPaths.user.action.me);
  }
}
