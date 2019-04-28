import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Team 2 UI';

  constructor(private router: Router,
    // private dirtyValidatorService: AppDirtyValidatorService,
    private authService: AuthService, private apiService: ApiService) {
    // window.addEventListener('beforeunload', function (event) {
    //   if (dirtyValidatorService.isAllModelsDirty()) {
    //       event.returnValue = 'You have some unsaved changes. Do you want to leave this page?';
    //   }
  }

  ngOnInit() {
    const url = window.location.href;

    // cannot derive the values for id_token and state using query params because of hash based routing
    if (url.includes('id_token')) {

      const idTokenStrStart = url.indexOf('id_token');
      const stateStrStart = url.indexOf('state');

      const id_token = url.substring(idTokenStrStart + 9, stateStrStart - 1);
      // add 9 more digits to skip 'id_token=' and -1 to skip & in & state
      // var redirectUrl = url.substring(stateStrStart + 6); //add 7 more digits to skip '&state='

      this.authService.setAuthData(id_token);

      const name = localStorage.getItem('name');
      const email = localStorage.getItem('email');

      // this.apiService.get('auth', 'getauthcookie', { name: name, email: email }).subscribe(
      //   data => {
      //     this.authService.setRole(data);
      //     this.router.navigate(['admin']);
      //   },
      //   err => { // on error.

      //   });

    } else {
      this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0);
      });
    }
  }
}

