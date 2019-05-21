import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';
import { Router } from '@angular/router';
import { RxjsService } from '../../services/rxjs-service/rxjs.service';
import { Subscription } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage-service/local-storage.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  data: any;
  counter: any;
  currentUser: User;

  constructor(private userService: UserService, 
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
      console.log(data);
      this.counter = data;
    });
  }

  getUser() {
    this.userService.getUser().subscribe((data) => {
      this.currentUser = new User();
      this.currentUser.Email = data.currentUser.emailAddress;
      this.currentUser.Name = data.currentUser.firstName + " " + data.currentUser.lastName;
    });
  }
}
