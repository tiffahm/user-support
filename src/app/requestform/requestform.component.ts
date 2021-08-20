import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { NotificationComponent } from '../notification/notification.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrganizationUnitsService } from '../services/organization-units.service';
import { DatasetService } from '../services/dataset.service';
import { makeID } from '../shared/helpers/make-id.helper';
@Component({
  selector: 'app-requestform',
  templateUrl: './requestform.component.html',
  styleUrls: ['./requestform.component.css']
})
export class RequestformComponent implements OnInit {
  isDataAvailable:boolean = false;
  selectedunits = ''
  selecteddatasets= ''
  selecterdataset = ''
  loadingunits =false 
  myForm: FormGroup;
  durationInSeconds = 2;

  constructor( public units : OrganizationUnitsService ,
     public fb: FormBuilder ,
     private datasets : DatasetService,
     private request : NgxDhis2HttpClientService,
     private _snackBar: MatSnackBar
     
     ) { }

  ngOnInit(): void {
    this.getunits()
    this.getdatasets()
    this.reactiveForm()
  }
  
  reactiveForm() {
    this.myForm =  this.fb.group({

    organizationunit: ['',[Validators.required]],
    datasetsunit: ['',[Validators.required]],
    
      
  })
        throw new Error('Method not implemented.');
  }

  getunits(){
    this.isDataAvailable = true

       return this.units.getorganizationunits().subscribe((data : {}) =>{
         
      console.log(data)

       this.selectedunits = data ['organisationUnits']
       })

  }
  getdatasets() {
  

    this.isDataAvailable = true
    return this.datasets.getAllDataSets().subscribe((data)=>{

      this.selecteddatasets = data ['dataSets']

      console.log(data)

    })


  }

  submitForm(){

    const requestPayload =  {
      "subject": "AOÛ_GrT:REQUEST FOR APROVAL CHANGE IN DATASET",
      "text": "There is request to update datasets to ," +this.myForm.get('organizationunit').value+"  add the follwing data " + this.myForm.get('datasetsunit').value +"",
      "userGroups": [
        {
          "id": "QYrzIjSfI8z"
        }
      ]
    }
    

    console.log(this.myForm)

    this.request.post('users.json',requestPayload).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )

    
    this.request.post('messageConversations?messageType=TICKET&messageConversationStatus=OPEN',requestPayload).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )

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
