import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user-service/user.service';
import { ResponseStatus } from '../../common/enum';
import { RxjsService } from '../../services/rxjs-service/rxjs.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  returnUrl: string;
  remember: boolean = false;

  showInvalidLogin: boolean = false;

  constructor(private userService: UserService, 
    private router: Router, 
    private _Activatedroute: ActivatedRoute,
    private authService: AuthService,
    private rxjsService: RxjsService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }

    this.email = this._Activatedroute.snapshot.queryParams['email'];
    this.password = this._Activatedroute.snapshot.queryParams['pwd'];
    this.returnUrl = this._Activatedroute.snapshot.queryParams['returnUrl'];
  }

  tryLogin() {
    this.showInvalidLogin = false;
    this.userService.login(this.email.trim(), this.password.trim())
      .subscribe(data => {
        this.authService.setSession(data);
        this.router.navigate([this.returnUrl ? this.returnUrl : "/"]);
        this.rxjsService.changeLoggedIn(true);
      }, err => {

        if (err.status == ResponseStatus.NotFound) {
          this.showInvalidLogin = true;
        }
    });
  }

}
