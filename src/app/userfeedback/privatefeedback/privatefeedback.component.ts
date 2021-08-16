import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { observable } from 'rxjs';
import { MessageserviceService } from 'src/app/services/messageservice.service';
import { makeID } from 'src/app/shared/helpers/make-id.helper';

@Component({
  selector: 'app-privatefeedback',
  templateUrl: './privatefeedback.component.html',
  styleUrls: ['./privatefeedback.component.css']
})
export class PrivatefeedbackComponent implements OnInit {
  displaymessage= false
  textmessages = ""
  
  msg: any [] = []
  count : number
  step = 0;
  myForm: FormGroup;

  setStep(index: number) {
    this.step = index;
  }
     
  gettext( event : Event){

   

    return this.textmessages  = (<HTMLTextAreaElement>event.target).value;

    this.displaymessage = true


  }

messagedata : any [  ] 


  constructor( public messages : MessageserviceService,
               public fb: FormBuilder,
               private sendmessages :  NgxDhis2HttpClientService
    ) { }

  ngOnInit(){
   this.getmessages()

   this.reactiveForm()
   
  
    
  }


  getmessages(){

    return this.messages.getPrivateFeedback().subscribe((data : {})=>{
        console.log(data)

        this.messagedata= data ['messageConversations']

        this.count = this.messagedata.length

        this.count = this.count

      })
      }




      reactiveForm() {
        this.myForm =  this.fb.group({
             text : ['',[Validators.required]],
           
           })
            throw new Error('Method not implemented.');
      }
  
      submitForm(){
  
        const messagePayload = {
             id: makeID(),
             "sender" : '',
            " from " : "",
            "text": this.myForm.get("text").value,
            "users": [],
            "userGroups": [
             {"id": "QYrzIjSfI8z"}
            ],
            "organisationUnits": [""],
            "status": "OPEN",
            "url": "api/messagesConversation"
    
          }
       
        
          this.sendmessages.post('messageConversitions.json', messagePayload).subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
          )
          this.sendmessages.post('dataStore/UserSupportApp/' + messagePayload.id + '.json', messagePayload).subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
          )
      
        
          console.log(this.myForm.value)
      
         }
      
         public errorHandling = (control: string, error: string) => {
          return this.myForm.controls[control].hasError(error);
        }


        deletemessages(){


          const messagePayload = {
            id: makeID(),
            "sender" : this.getmessages(),
           " from " : "",
           "text": this.myForm.get("text").value,
           "users": [],
           "userGroups": [
            {"id": "QYrzIjSfI8z"}
           ],
           "organisationUnits": [""],
           "status": "OPEN",
           "url": "api/messagesConversation/" +this.messagedata
   
         }

          return this.sendmessages.delete('messageConversations' + messagePayload.id + '.json',).subscribe( 
          (response) => console.log(response),
          (error) => console.log(error)
          )
        }
    

     


    
}
