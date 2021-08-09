import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';

@Injectable({
  providedIn: 'root'
})
export class UserrolesService {

  constructor(private userroles: NgxDhis2HttpClientService) { }


  getuseRoles(){
           
    return this.userroles.get('userRoles.json')


  }
}
