import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '../notification/notification.component';
import { makeID } from '../shared/helpers/make-id.helper';

@Component({
  selector: 'app-composemessage',
  templateUrl: './composemessage.component.html',
  styleUrls: ['./composemessage.component.css']
})
export class ComposemessageComponent implements OnInit {

  myForm: FormGroup;
  durationInSeconds = 2;
  messages: any;
 

  constructor(
    public fb: FormBuilder,

    private  _snackBar : MatSnackBar
  ) { }

  ngOnInit() {
    this. reactiveForm()
  }


  reactiveForm() {
    this.myForm =  this.fb.group({

       subject : ['',[Validators.required]],
       text : ['',[Validators.required]],
        to : ['',[Validators.required,]],
     

    })
        throw new Error('Method not implemented.');
  }

  submitForm(){

    const messagePayload = {
      id: makeID(),
        " from " : "",
        "subject":  this.myForm.get("subject").value,
        "text": this.myForm.get("text").value,
        "users": [],
        "userGroups": [
         {"id": "QYrzIjSfI8z"}
        ],
        "organisationUnits": [""],
        "status": "OPEN",
        "url": "api/messagesConversation"

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

  openSnackBar(){
    this._snackBar.openFromComponent(NotificationComponent, {
      duration: this.durationInSeconds * 1000,
    });

  }

}
