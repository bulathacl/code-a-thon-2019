import { Injectable } from '@angular/core';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor() { }

    setSession(authData: any){
        const expiresAt = moment().add(authData.expiration,'second');

        localStorage.setItem('id_token', authData.token);
        localStorage.setItem('user_id', authData.userId);
        localStorage.setItem('username', authData.username);
        localStorage.setItem('user_mobile', authData.userMobile);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }
    
    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("expires_at");
        localStorage.removeItem("user_mobile");
        localStorage.removeItem("username");
    }

    getLoggedInUserId(){
        return localStorage.getItem("user_id");
    }

    getLoggedInUsername(){
        return localStorage.getItem("username");
    }

    getLoggedInuserMobile(){
        return localStorage.getItem("user_mobile");
    }

    public isLoggedIn() {
        return (localStorage.getItem("id_token") != null && localStorage.getItem("id_token") != undefined)
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }    
}
