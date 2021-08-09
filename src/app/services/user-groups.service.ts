import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';

@Injectable({
  providedIn: 'root'
})
export class UserGroupsService {

  constructor( private userGroup :  NgxDhis2HttpClientService  ) { }

  getuserGroups(){

    return this.userGroup.get('userGroups.json')
    
  }
}
