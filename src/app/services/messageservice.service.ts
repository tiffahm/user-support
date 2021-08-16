import { Injectable } from '@angular/core';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
export interface User {
  subject : string
  text : string
}
@Injectable({
  providedIn: 'root'
})
export class MessageserviceService {

  
  user : String;


  constructor( public provider : HttpClient , private feedback :  NgxDhis2HttpClientService) { 

    
  }

  


getaFeedback(){
       
  return this.feedback.get('messageConversations.json?fields=created,user,subject,messageType&filter=messageType:eq:TICKET')
  .pipe(
    retry(1),
    catchError(this.httpError)
     )
 
}

getPrivateFeedback(){
       
  return this.feedback.get('messageConversations.json?fields=created,user,subject,messageType&filter=messageType:eq:PRIVATE')
  .pipe(
    retry(1),
    catchError(this.httpError)
     )
 
}

getSystemFeedback(){
       
  return this.feedback.get('messageConversations.json?fields=created,user,subject,messageType&filter=messageType:eq:SYSTEM')
  .pipe(
    retry(1),
    catchError(this.httpError)
     )
 
}
getValidationFeedback(){
       
  return this.feedback.get('messageConversations.json?fields=created,user,subject,messageType&filter=messageType:eq:VALIDATION_RESULT')
  .pipe(
    retry(1),
    catchError(this.httpError)
     )
 
}

deletemessage(){
  return this.feedback.delete('messageConversations.json?fields=id')
}

create(users) {
  this.feedback.post('users.json',this.user)
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
