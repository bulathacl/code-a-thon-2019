import { Component, OnInit, Input } from '@angular/core';
import { RxjsService } from '../../services/rxjs-service/rxjs.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ContractService } from '../../services/contract-service/contract.service';
  
@Component({
  selector: 'app-contract-action-form',
  templateUrl: './contract-action-form.component.html',
  styleUrls: ['./contract-action-form.component.scss']
})
export class ContractActionFormComponent implements OnInit {  
    @Input() data: any;
    parameters: any;
    form: FormGroup;
    action: any;
    contract: any;
  
    constructor(private rxjsService: RxjsService,
      private contractService: ContractService) {     
    }
  
    ngOnInit() {
      this.contract = this.data.contract;
      this.action = this.data.action;
      this.parameters = this.action.parameters;
      let formControls = {};
      for (let i = 0; i< this.parameters.length; i++) {
        formControls[this.parameters[i].name] = new FormControl('');
      }
      this.form = new FormGroup(formControls);
    }
  
    done(data: any) {
      let parameters = [];
      this.parameters.forEach(parameter => {
        parameters.push({
          name: parameter.name,
          value: this.form.controls[parameter.name].value,
          workflowFunctionParameterId: parameter.id,
        })
      });
      this.contractService.postActions(this.contract.id, this.action.id, parameters).subscribe((data) => {
        console.log(data);
      });
    }
  
    changeData() {
      this.rxjsService.changeHomeData(new Date);
    }
  
  }
  