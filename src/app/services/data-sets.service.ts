import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';

@Injectable({
  providedIn: 'root'
})
export class DataSetsService {

  constructor(  private datasets : NgxDhis2HttpClientService) { }

  endEpoint='http://play.dhis2.org/demo/api/organisationUnits'

}
