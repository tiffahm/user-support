import { Component, OnInit } from '@angular/core';
import { MessageserviceService } from 'src/app/services/messageservice.service';

@Component({
  selector: 'app-privatefeedback',
  templateUrl: './privatefeedback.component.html',
  styleUrls: ['./privatefeedback.component.css']
})
export class PrivatefeedbackComponent implements OnInit {
  count : number
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

messagedata : any [  ] 


  constructor( public messages : MessageserviceService) { }

  ngOnInit(){
   this.getmessages()
  
    
  }


  getmessages(){

    return this.messages.getPrivateFeedback().subscribe((data : {})=>{
        console.log(data)

        this.messagedata= data ['messageConversations']

        this.count = this.messagedata.length

        this.count = this.count

      })
      }

     


    
}
