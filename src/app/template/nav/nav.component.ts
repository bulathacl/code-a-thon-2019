import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SystemSettings } from '../../common/system-settings';
import { TestComponentComponent } from '../../components/test-component/test-component.component';
import { RxjsService } from '../../services/rxjs-service/rxjs.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {

  @ViewChild('popupModal') popupModal;
  private subscription: Subscription;
  loggedIn = false;
  systemSettings = SystemSettings;
  navbarItems = [
    { 
      name: "Nav1",
      href: "#",
      items: 
        [
          {
            name: "Sub1"
          },
          {
            name: "Sub2"
          }
        ]
    },
    { 
      name: "Nav2",
      component: TestComponentComponent,
      items: 
        [
          {
            name: "Sub1",
            data: {
              header: "Sub1Head",
              body: "Sub1Body"
            }
          },
          {
            name: "Sub2",
            data: {
              header: "Sub2Head",
              body: "Sub2Body"
            }
          }
        ]
    }, 
    { 
      name: "Nav3",
      component: TestComponentComponent,
      data: {
        header: "Nav3Head",
        body: "Nav3Body",
        confirmation: true
      }
    },
    { 
      name: "Nav4",
      href: "#"
    }
  ]

  constructor(private router: Router, 
    private authService: AuthService,
    private rxjsService: RxjsService) { }

  ngOnInit() {
    this.subscription = this.rxjsService.changeLoggedInSubject.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });

    if(this.authService.isAuthenticated() && !this.authService.isExpired()){
      this.loggedIn = true;
    }
    else{
      this.loggedIn = false;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openModal(component: Component, data: any) {
    this.popupModal.openModal(component, data);
  }

  logoClicked() {
    this.router.navigate(["/"]);
  }
  
  loginClicked() {
    //this.router.navigate(["/login"]);
    this.authService.authorize("/");
  }

  logoutClicked() {
    this.authService.logout();
    this.rxjsService.changeLoggedIn(false);
    this.router.navigate(["/"]);
  }
}
