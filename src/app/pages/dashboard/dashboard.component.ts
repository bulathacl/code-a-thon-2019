import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';
import { Router } from '@angular/router';
import { RxjsService } from '../../services/rxjs-service/rxjs.service';
import { Subscription } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage-service/local-storage.service';
import { User } from '../../models/user';
import { ApplicationService } from '../../services/application-service/application.service';
import { ContractService } from '../../services/contract-service/contract.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private subscription: Subscription;
  data: any;
  counter: any;
  currentUser: User;
  applications: any[] = [];

  constructor(private userService: UserService,
    private applicationService: ApplicationService,
    private contractService: ContractService,
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

  getApplications() {
    this.applicationService.getAllApplications().subscribe((data) => {
      if(data.applications && data.applications.length > 0) {
        this.applications = data.applications;
      }
    });
  }

  getContracts(workflow) {
    this.contractService.getAllContractsByWorkflowId(workflow.id).subscribe((data) => {
      if(data.contracts && data.contracts.length > 0) {
        workflow['contracts'] = data.contracts;
      }
    });
  }

  getWorkflows(application) {
    this.applicationService.getWorkflowsByAppId(application.id).subscribe((data) => {
      if(data.workflows && data.workflows.length > 0) {
        application['workflows'] = data.workflows;
      }
    });
  }
}
