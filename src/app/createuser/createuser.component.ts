import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { Observable } from 'rxjs';

import { NotificationComponent } from '../notification/notification.component'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrganizationUnitsService } from '../services/organization-units.service';
import { UserrolesService } from '../services/userroles.service';
import { UserGroupsService } from '../services/user-groups.service';


@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit  {

  selectedrole = '';
  selectedunit = '';
  selectedgroup= '';
  selectedorganization = '';
  selectedunits : '';
  myForm: FormGroup;
  orgUnits$: Observable<any[]>
  userRoles$ : Observable<any[]>
  userGroups$ : Observable <any []>
  durationInSeconds = 2;
 
 

  constructor(
     private units : OrganizationUnitsService ,
     public fb: FormBuilder  , 
     private  user : NgxDhis2HttpClientService,
     private userroles: UserrolesService,
     private usergroups : UserGroupsService,
     private _snackBar : MatSnackBar
   ) { }

  
  ngOnInit() : void {
    
    // this.orgUnits$ = 
    this.getunits()
    // this.userRoles$ = 
    this.getuserRoles()
    // this.userGroups$ = 
    this.getuserGroups()
    this.reactiveForm()
     
   }
  reactiveForm() {
    this.myForm =  this.fb.group({
      firstname : ['',[Validators.required,Validators.minLength(4)]],
      lastname : ['',[Validators.required,Validators.minLength(4)]],
      email : ['',[Validators.required,Validators.email]],
      password : ['',[Validators.required,Validators.minLength(4)]],
      confirmpassword : ['',[Validators.required,Validators.minLength(4)]],
      phone : ['',[Validators.required,Validators.maxLength(10)]],
      organizationunit : ['',[Validators.required]],
      userroleunit : ['',[Validators.required]],
      usergroupunit : ['',[Validators.required]]
    })
        throw new Error('Method not implemented.');
  }


   submitForm(){ 
    const userPayload = {

      "action": " create the user with the following credentials...",
      "method": "POST",
      "payLoad" : {
        
          "id": Math.random().toString(36).substr(2, 5),
          "firstName": this.myForm.get("firstname").value,
          "surname": this.myForm.get("lastname").value,
          "email": this.myForm.get("email").value,
          "phone" : this.myForm.get("phone").value,
          "userRoles": [
            {
              "id": this.myForm.get("userroleunit").value
            }
          ],
         
          "organisationUnits": [
            {
              "id": this.myForm.get("organizationunit").value
            }
          ],
          "userGroups": [
            {
              "id": this.myForm.get("usergroupunit").value
            }
          ],
    
        
      },
     
      "status": "OPEN",
      "url": "api/users"
    }

    console.log(this.myForm)

    this.user.post('users.json',userPayload).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )

    
    this.user.post('dataStore/UserSupportApp/user1.json',userPayload).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )

   }
  

  getunits(){
    // return this.units.getorganizationunits()
    return  this.units.getorganizationunits().subscribe((data : {}) =>{

      console.log(data)

       this.selectedunits = data ['organisationUnits']
          
       this.selectedunits
            
           })

  }

  getuserRoles(){

    return this.userroles.getuseRoles().subscribe(( data : {})=>{
      console.log(data)

      this.selectedrole = data ['userRoles']
    })

  }

  getuserGroups(){

    return this.usergroups.getuserGroups().subscribe (( data : {})=>{
      console.log(data)

      this.selectedgroup = data ['userGroups']
    })

  }

  public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  }

  openSnackBar(){
    this._snackBar.openFromComponent(NotificationComponent, {
      duration: this.durationInSeconds * 1000,
    });

  }


 
}
