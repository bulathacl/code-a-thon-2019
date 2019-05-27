import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { ApiPaths } from '../../common/system-settings';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private apiService: ApiService) { }

  getAllApplications() {
    return this.apiService.get(ApiPaths.application.controller, ApiPaths.application.action.getAllApplications);
  }

  getWorkflowsByAppId(appId) {
    return this.apiService.getByParams(ApiPaths.application.controller, ApiPaths.application.action.getWorkFlowsByAppId, {}, { applicationId: appId });
  }
}
