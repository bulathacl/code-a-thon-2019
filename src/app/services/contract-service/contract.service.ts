import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { ApiPaths } from '../../common/system-settings';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private apiService: ApiService) { }

  getAllContractsByWorkflowId(workflowId) {
    return this.apiService.getByParams(ApiPaths.contract.controller, ApiPaths.contract.action.getAllContracts, { workflowId: workflowId }, {});
  }

  getAllActionsByContractId(contractId) {
    return this.apiService.getByParams(ApiPaths.contract.controller, ApiPaths.contract.action.getActionsByContractId, {}, { contractId: contractId });
  }
}
