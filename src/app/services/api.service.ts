import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl: string;

  constructor(private client: HttpClient) { 
      this.apiUrl = 'https://localhost:44313/api';
    }

  public get(controller: string, action: string):any{
    var reqDetails = this.getRequestInfo(controller, action);
    return this.client.get(reqDetails.url, reqDetails.options);
  }

  public getByParams(controller: string, action: string, params: any):any{
    
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

  private getRequestInfo(controller: string, action: string){

    let urlTmp = this.apiUrl + '/' + controller + '/' + action;
    const idToken = localStorage.getItem("id_token");

    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + idToken);

    let optionsTmp = {
      headers: httpHeaders,
      params: {},
      body: {},
	  withCredentials: true
    };

    return {url: urlTmp, options: optionsTmp}
  }
}
