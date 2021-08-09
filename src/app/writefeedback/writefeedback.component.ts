import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageserviceService } from '../services/messageservice.service';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { OrganizationUnitsService } from '../services/organization-units.service';
import { NotificationComponent } from '../notification/notification.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { makeID } from '../shared/helpers/make-id.helper';



@Component({
  selector: 'app-writefeedback',
  templateUrl: './writefeedback.component.html',
  styleUrls: ['./writefeedback.component.css']
})




export class WritefeedbackComponent implements OnInit {

  myForm: FormGroup;
  selectedunits: any;
  durationInSeconds = 2;
 

  
  constructor(  public provider : HttpClient ,
    public fb: FormBuilder, 
    public messages : NgxDhis2HttpClientService,
    private units : OrganizationUnitsService , 
    private  _snackBar : MatSnackBar
    ) { }

  


  ngOnInit(): void {
   
    this.reactiveForm()
    this.sendmessages()

  }

  reactiveForm() {
    this.myForm =  this.fb.group({

      subject : ['',[Validators.required]],
      text : ['',[Validators.required]],
     

    })
        throw new Error('Method not implemented.');
  }
  sendmessages(){
   }

  submitForm(){

  const messagePayload = {
    id: makeID(),
      "subject":  this.myForm.get("subject").value,
      "text": this.myForm.get("text").value,
      "users": [],
      "userGroups": [
       {"id": "QYrzIjSfI8z"}
      ],
      "organisationUnits": [""]
    }
 
  
    this.messages.post('messageConversitions.json', messagePayload).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
    this.messages.post('dataStore/UserSupportApp/' + messagePayload.id + '.json', messagePayload).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )

  
    console.log(this.myForm.value)

   }

   public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  }
  // getunits(){
  //   // return this.units.getorganizationunits()
  //   return  this.units.getorganizationunits().subscribe((data : {}) =>{

  //     console.log(data)

  //      this.selectedunits = data ['organisationUnits']
          
  //      this.selectedunits
            
  //          })

  // }

  openSnackBar(){
    this._snackBar.openFromComponent(NotificationComponent, {
      duration: this.durationInSeconds * 1000,
    });

  }
}

