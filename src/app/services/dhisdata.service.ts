import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';


export class User {
  id: string;
  name: string;
 
}

@Injectable({
  providedIn: 'root'
})
export class DhisdataService {

  constructor( public provider : HttpClient,private httpClient: NgxDhis2HttpClientService
    ) { }


  getUsers() {
    return this.httpClient.get('users.json')
    .pipe(
    retry(1),
    catchError(this.httpError)
     )
  }


  httpError(error) {
     let msg = '';
    if(error.error instanceof ErrorEvent) {
       // client side error
       msg = error.error.message;
     } else {       // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
   }
     console.log(msg);
     return throwError(msg);
  }

 }
