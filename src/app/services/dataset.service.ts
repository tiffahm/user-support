import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';

@Injectable({
  providedIn: 'root'
})
export class DatasetService {
  httpClient: any;

  constructor( private dataset: NgxDhis2HttpClientService) {

    
   }

  getAllDataSets(){

      return this.dataset.get('dataSets.json')
   }

}
