import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RxjsService {

  private homeDataParser = new Subject<any>();
  private loggedinParser = new Subject<any>();
  private popupModalParser = new Subject<any>();

  public changeHomeDataSubject: Observable<any>;
  public changeLoggedInSubject: Observable<any>;
  public changePopupModalSubject: Observable<any>;

  constructor() {
    this.changeHomeDataSubject = this.homeDataParser.asObservable();
    this.changeLoggedInSubject = this.loggedinParser.asObservable();
    this.changePopupModalSubject = this.popupModalParser.asObservable();
  }

  changeHomeData(data) {
    this.homeDataParser.next(data);
  }

  changeLoggedIn(loggedIn: boolean) {
    this.loggedinParser.next(loggedIn);
  }

  openModal(component, data) {
    this.popupModalParser.next({component: component, data: data});
  }
}
