import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl: string;

  constructor(private client: HttpClient) { 
    this.apiUrl = 'https://team2-p77f5g-api.azurewebsites.net/api/v1';
    localStorage
  }

  public get(controller: string, action: string):any{
    var reqDetails = this.getRequestInfo(controller, action);
    return this.client.get(reqDetails.url, reqDetails.options);
  }

  public getByParams(controller: string, action: string, params: any, urlParams: any):any{
    
    for (const property in urlParams) {
      action = action.replace('{' + property + '}', urlParams[property]);
    }
    
    var reqDetails = this.getRequestInfo(controller, action);

    let queryParams = new HttpParams();
    for (const property in params) {
      queryParams = queryParams.set(property, params[property]);
    }
    reqDetails.options.params = queryParams;

    return this.client.get(reqDetails.url, reqDetails.options);
  }

  public post(controller: string, action: string, body: any): any{
    var reqDetails = this.getRequestInfo(controller, action);    
    return this.client.post(reqDetails.url, body, reqDetails.options);
  }

  public postByParams(controller: string, action: string, params: any, urlParams: any, body: any):any{
    
    for (const property in urlParams) {
      action = action.replace('{' + property + '}', urlParams[property]);
    }
    
    var reqDetails = this.getRequestInfo(controller, action);

    let queryParams = new HttpParams();
    for (const property in params) {
      queryParams = queryParams.set(property, params[property]);
    }
    reqDetails.options.params = queryParams;

    return this.client.post(reqDetails.url, body, reqDetails.options);
  }

  private getRequestInfo(controller: string, action: string){

    let urlTmp = this.apiUrl + '/' + controller + (action != '' ? ('/' + action) : '');
    const idToken = localStorage.getItem("id_token");

    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + idToken);

    let optionsTmp = {
      headers: httpHeaders,
      params: {},
      body: {}
    };

    return {url: urlTmp, options: optionsTmp}
  }
}
