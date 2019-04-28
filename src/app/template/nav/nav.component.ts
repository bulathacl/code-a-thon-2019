import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SystemSettings } from '../../common/system-settings';
import { TestComponentComponent } from '../../components/test-component/test-component.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {

  @ViewChild('popupModal') popupModal;
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

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
   if(this.authService.isAuthenticated()){

   }
   else{

   }
  }

  openModal(component: Component, data: any){
    this.popupModal.openModal(component, data);
  }

  logoClicked(){
    this.router.navigate(["/"]);
  }
  
  loginClicked(){
    if(this.authService.isAuthenticated()){
      this.authService.logout();
    }
    else{
          this.router.navigate(["/login"]);
    }
  }

}
