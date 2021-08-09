import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';

@Injectable({
  providedIn: 'root'
})
export class OrganizationUnitsService {

  constructor( private organizationunits : NgxDhis2HttpClientService ) { }

  endEpoint='http://play.dhis2.org/demo/api/organisationUnits'


  getorganizationunits(){
       
    return this.organizationunits.get('organisationUnits.json')
         
  }


}
