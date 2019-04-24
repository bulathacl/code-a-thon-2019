import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  remember: boolean = false;

  showInvalidLogin: boolean = false;

  constructor(private apiService: ApiService, 
    private router: Router, 
    private _Activatedroute: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {
    this.email = this._Activatedroute.snapshot.queryParams['email'];
    this.password = this._Activatedroute.snapshot.queryParams['pwd'];
  }

  tryLogin() {
    this.showInvalidLogin = false;
    this.apiService.post('auth','login', {email: this.email.trim(), password: this.password.trim()})
    .subscribe(data => {
      this.authService.setSession(data);
      this.router.navigate(["/"]);
    }, err => {

      if (err.status == 401) {
        this.showInvalidLogin = true;
      }
    });
  }

}
