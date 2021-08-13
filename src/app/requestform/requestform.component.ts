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

  selectedunits = ''
  selecteddatasets= ''
  selecterdataset = ''
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
    text : ['',[Validators.required]],
      
  })
        throw new Error('Method not implemented.');
  }

  getunits(){

    return  this.units.getorganizationunits().subscribe((data : {}) =>{

      console.log(data)

       this.selectedunits = data ['organisationUnits']
   })

  }
  getdatasets() {

    return this.datasets.getAllDataSets().subscribe((data)=>{

      this.selecteddatasets = data ['dataSets']

      console.log(data)

    })


  }

  submitForm(){

    const requestPayload =  {
      id : makeID(),
      "action": "add the following to the " + this.myForm.get("organizationunit").value ,
      "method": "PUT",
      "payload": {
        "id": Math.random().toString(36).substr(2, 5),
        "name": this.myForm.get("datasetsunit").value,
        "organisationUnits": [
          {
            "id": this.myForm.get("organizationunit").value,
          },
         ],
        "periodType": "Monthly"
      },
      "status": "OPEN",
      "url": "api/dataSets/"
    }

    

    console.log(this.myForm)

    this.request.post('users.json',requestPayload).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )

    
    this.request.post('dataStore/UserSupportApp/'+requestPayload.id+'.json',requestPayload).subscribe(
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
