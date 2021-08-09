import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

import { NotificationComponent } from '../notification/notification.component';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { MustMatch } from '../shared/must-match';
import { DhisdataService } from '../services/dhisdata.service';





@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  selected = '';
  durationInSeconds = 2;
  user = ''
  myForm: FormGroup;
  submitted: boolean;
  
  
  constructor(  private _snackBar: MatSnackBar ,
     public users : DhisdataService,
     public fb: FormBuilder ,
     public  password : NgxDhis2HttpClientService ) { 
  }

  ngOnInit(): void {
    this.fetchUsers()
    this.reactiveForm()

  }


  reactiveForm() {
    this.myForm =  this.fb.group({
      password: ['',[Validators.required,Validators.minLength(4)]],
      confirmpassword : ['',[Validators.required,Validators.minLength(4)]],
     users:  ['',[Validators.required]],
      
     }
    //  ,{
    // //   validator: MustMatch('password', 'confirmPassword')
    // // }
    
    )
        throw new Error('Method not implemented.');
  }


  makeid() {
    let rand = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 9; i++)
      rand+= possible.charAt(Math.floor(Math.random() * possible.length));
  
    return rand;
  }

  

  // get f() { return this.myForm.controls; }


  submitForm(){ 
    const passwordPayload = {

      "action": " reset the password of the following user",
      "method": "PUT",

      "id" : this.makeid(),
      "payLoad" : {
        
          "id":this.myForm.get("users").value,
           "userCredentials" : [{
             "newpassword": this.myForm.get("password").value,
             "confirmpasword": this.myForm.get("confirmpassword").value,
           }],
          
          "userRoles": [
            {
              "id": ""
            }
          ],
         
          "organisationUnits": [
            {
              "id": ""
            }
          ],
          "userGroups": [
            {
              "id": this.makeid()
            }
          ],
     },
     
      "status": "OPEN",
      "url": "api/users"
    }

    console.log(this.myForm)

    this.password.post('users.json',passwordPayload).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )

    
    this.password.post('dataStore/UserSupportApp/resetpaasword34.json',passwordPayload).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
    // this.submitted = true;

    // if ( this.myForm.invalid){
    //   return;
    // }
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.myForm.value))

    

   }
  openSnackBar(){
    this._snackBar.openFromComponent(NotificationComponent, {
      duration: this.durationInSeconds * 1000,
    });

  }


 

  fetchUsers() {
    return this.users.getUsers().subscribe((data: {}) => {
         
       console.log(data)

       this.user = data ['users']
      })    
  }
 

}


