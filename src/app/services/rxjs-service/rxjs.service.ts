import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RxjsService {

  private homeDataParser = new Subject<any>();

  public changeHomeDataSubject: Observable<any>;

  constructor() {
    this.changeHomeDataSubject = this.homeDataParser.asObservable();
  }

  changeHomeData(data){
    this.homeDataParser.next(data);
  }
}
