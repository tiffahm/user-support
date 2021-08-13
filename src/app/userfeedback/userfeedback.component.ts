import { Component, OnInit } from '@angular/core';
import { MessageserviceService } from '../services/messageservice.service';




@Component({
  selector: 'app-userfeedback',
  templateUrl: './userfeedback.component.html',
  styleUrls: ['./userfeedback.component.css']
})
export class UserfeedbackComponent implements OnInit {

  step = 0;
  count: number;

  setStep(index: number) {
    this.step = index;
  }

messagedata : any [  ] 


  constructor( public messages : MessageserviceService) { }

  ngOnInit(){
   this.getmessages()
   this.deletemessage()
    
  }


  getmessages(){

    return this.messages.getaFeedback().subscribe((data : {})=>{
        console.log(data)

        this.messagedata= data ['messageConversations']
        this.count = this.messagedata.length
       })
      }

    deletemessage(){

      return this.messages.deletemessage().subscribe((data : {})=>{
        console.log(data)


      })

    }
}
