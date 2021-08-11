import { Component, OnInit } from '@angular/core';
import { MessageserviceService } from 'src/app/services/messageservice.service';

@Component({
  selector: 'app-systemfeedback',
  templateUrl: './systemfeedback.component.html',
  styleUrls: ['./systemfeedback.component.css']
})
export class SystemfeedbackComponent implements OnInit {

  step = 0;
  count: number;

  setStep(index: number) {
    this.step = index;
  }

messagedata : any [  ] 


  constructor( public messages : MessageserviceService) { }

  ngOnInit(){
   this.getmessages()
    
  }


  getmessages(){

    return this.messages.getSystemFeedback().subscribe((data : {})=>{
        console.log(data)

        this.messagedata= data ['messageConversations']
        this.count = this.messagedata.length
       })


}
}
