import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DhisdataService {

  constructor( public user : HttpClient) { }

  getData(){
    return this.user.get('https://play.dhis2.org/dev/api/33/users');
  }
}
