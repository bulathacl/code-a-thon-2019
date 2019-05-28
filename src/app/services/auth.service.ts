import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
// import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AppSettingsService } from './app-settings.service';

@Injectable()
export class AuthService {

  static authDataKey = 'GeveoRecruitAuthData';
  private msAuthDefaultNonce = '678910';

  constructor(private appSettingsService: AppSettingsService) { }

  isAuthenticated() {
    const id_token = localStorage.getItem('id_token');
    if (id_token) { return true; }
    return false;
  }

  isExpired() {
    const currentTime = new Date().getTime() / 1000;
    const exp = parseInt(localStorage.getItem('expiration'), 10);

    if (currentTime > exp) {
      return true;
    }
    return false;
  }

  getAuthData(): AuthData {
    const authData = null; // JSON.parse(Cookie.get(AuthService.authDataKey));
    return authData;
  }

  authorize(returnUrl: string) {

    const appSettings = null; // this.appSettingsService.getSettings();

    // temp fix
    const msOAuth2AuthorizeEndpoint = 'https://login.microsoftonline.com/geveo.com/oauth2/authorize';
    const msAppClientId = '292f12fc-993c-47c3-9d6a-f3aa2034f127';
    const msAuthRedirectUrl = 'http://localhost:4200'; // 'https://geveoteam2ui.azurewebsites.net';

    const url = msOAuth2AuthorizeEndpoint + '?'
      + 'client_id=' + msAppClientId + '&'
      + 'grant_type=implicit&'
      + 'response_type=id_token&'
      + 'redirect_uri=' + encodeURIComponent(msAuthRedirectUrl) + '&'
      + 'scope=openid email profile&'
      + 'response_mode=fragment&'
      + 'state=' + returnUrl + '&'
      + 'nonce=' + this.msAuthDefaultNonce;

    window.location.href = url;
  }

  logout() {
    localStorage.removeItem('id_token');
  }

  setAuthData(id_token: string) {
    localStorage.removeItem('id_token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('expiration');

    localStorage.setItem('id_token', id_token);

    const jwtPayload = id_token.split('.')[1];
    const decodedJwtJsonData = window.atob(jwtPayload);
    const decodedJwtData = JSON.parse(decodedJwtJsonData);

    localStorage.setItem('name', decodedJwtData.name);
    localStorage.setItem('email', decodedJwtData.email);
    localStorage.setItem('expiration', decodedJwtData.exp);
  }

  setRole(role: string) {
    localStorage.setItem('role', role);
  }

  getRole(): string {
    return localStorage.getItem('role');
  }

  isAdmin(): boolean {
    const isAdmin = this.getRole() === 'admin' ? true : false;
    return isAdmin;
  }

  setSession(data){

  }

}

export interface AuthData {
  firstName: string;
  lastName: string;
  userName: string;
}



// import { Injectable } from '@angular/core';
// import * as moment from "moment";

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//     constructor() { }

//     setSession(authData: any){
//         const expiresAt = moment().add(authData.expiration,'second');

//         localStorage.setItem('id_token', authData.token);
//         localStorage.setItem('user_id', authData.userId);
//         localStorage.setItem('username', authData.username);
//         localStorage.setItem('user_mobile', authData.userMobile);
//         localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
//   }
//     logout() {
//         localStorage.removeItem("id_token");
//         localStorage.removeItem("user_id");
//         localStorage.removeItem("expires_at");
//         localStorage.removeItem("user_mobile");
//         localStorage.removeItem("username");
//     }

//     getLoggedInUserId(){
//         return localStorage.getItem("user_id");
//     }

//     getLoggedInUsername(){
//         return localStorage.getItem("username");
//     }

//     getLoggedInuserMobile(){
//         return localStorage.getItem("user_mobile");
//     }

//     public isLoggedIn() {
//         return (localStorage.getItem("id_token") != null && localStorage.getItem("id_token") != undefined)
//     }

//     isLoggedOut() {
//         return !this.isLoggedIn();
//     }

//     getExpiration() {
//         const expiration = localStorage.getItem("expires_at");
//         const expiresAt = JSON.parse(expiration);
//         return moment(expiresAt);
//     }
// }
