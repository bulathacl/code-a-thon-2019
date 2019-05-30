import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';
import { RxjsService } from '../../services/rxjs-service/rxjs.service';
import { Subscription } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage-service/local-storage.service';
import { User } from '../../models/user';
import { ApplicationService } from '../../services/application-service/application.service';
import { ContractService } from '../../services/contract-service/contract.service';
import { ContractActionFormComponent } from '../../components/contract-action-form/contract-action-form.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('popupModal') popupModal;
  private subscription: Subscription;
  data: any;
  counter: any;
  currentUser: User;
  applications: any[];

  constructor(private userService: UserService,
    private applicationService: ApplicationService,
    private contractService: ContractService,
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
    if(!this.applications) {
      this.applicationService.getAllApplications().subscribe((data) => {
        if(data && data.applications && data.applications.length > 0) {
          this.applications = data.applications;
        }
      });
    }
    else {
      this.applications = undefined;
    }
  }

  getContracts(workflow) {
    if (!workflow.contracts)
    {
      this.contractService.getAllContractsByWorkflowId(workflow.id).subscribe((data) => {
        if(data && data.contracts && data.contracts.length > 0) {
          workflow.contracts = data.contracts;
        }
      });
    }
    else {
      workflow.contracts = undefined;
    }
  }

  getWorkflows(application) {
    if (!application.workflows) {
      this.applicationService.getWorkflowsByAppId(application.id).subscribe((data) => {
        if(data && data.workflows && data.workflows.length > 0) {
          application.workflows = data.workflows;
        }
      });
    }
    else {
      application.workflows = undefined;
    }
  }

  getActions(contract) {
    if (!contract.actions) {
      this.contractService.getAllActionsByContractId(contract.id).subscribe((data) => {
        if(data && data.workflowFunctions && data.workflowFunctions.length > 0) {
          contract.actions = data.workflowFunctions;
        }
      });
    }
    else {
      contract.actions = undefined;
    }
  }

  isEmpty(array) {
    return !(array && array.length > 0)
  }

  takeActions(action, contract, application) {
    Promise.all([
      this.applicationService.getAllApplicationById(application.id).subscribe((data) => {
        let applicationRoles;
        if(data) {
          applicationRoles = data.applicationRoles
        }
        if(applicationRoles) {
          action.parameters.forEach(parameter => {
            this.getUsersByRoleName(application.id, applicationRoles, parameter.type.name, (data) => {
              parameter.data = data;
            });
          });
        }        
      }),
      this.rxjsService.openModal(ContractActionFormComponent, {
        header: action.displayName,
        confirmation: true,
        action: action,
        contract: contract
      })
    ]);  
  }

  getUsersByRoleName(appId, applicationRoles, name: string, callback) {
    let role = applicationRoles.find((role) => role.name == name);
    if(!role) {
      callback(undefined);
      return;
    }
    this.applicationService.getRoleAssignmentsByAppId(appId).subscribe((data) => {
      if (data) {
        let users = data.roleAssignments.filter((roleAssignment) => roleAssignment.applicationRoleId == role.id);
        if (users) {
          callback(users.map((roleAssignment) => {
            return {
              id: roleAssignment.user.userID,
              name: roleAssignment.user.firstName + " " + roleAssignment.user.lastName,
              identifier: roleAssignment.user.emailAddress
            }
          }));
          return;
        }
        else {
          callback([]);
          return;
        }
      }
    });    
  }
}
