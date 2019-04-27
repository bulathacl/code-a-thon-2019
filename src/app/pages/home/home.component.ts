import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { RxjsService } from '../../services/rxjs-service/rxjs.service';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage-service/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  data: any;
  counter: any;

  constructor(private apiService: ApiService, 
    private router: Router, 
    private rxjsService: RxjsService,
    private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.subscription = this.rxjsService.changeHomeDataSubject.subscribe((data) => {
      this.data = data;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  overviewItemClicked(event: any) {
    this.router.navigate(["/itemdetail/" + event + "/false"]);
  }

  getCounter() {
    this.localStorageService.getItem('counter').subscribe((data) => {
      console.log(data)
      this.counter = data;
    });
  }
}
