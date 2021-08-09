import { Component, OnInit } from '@angular/core';
import { MessageserviceService } from '../services/messageservice.service';




@Component({
  selector: 'app-userfeedback',
  templateUrl: './userfeedback.component.html',
  styleUrls: ['./userfeedback.component.css']
})
export class UserfeedbackComponent implements OnInit {

messagedata : any [  ] 


  constructor( public messages : MessageserviceService) { }

  ngOnInit(){
   this.getmessages()
    
  }


  getmessages(){

    return this.messages.getFeedback().subscribe((data : {})=>{
        console.log(data)

        this.messagedata = data ['messageConversations']
       })


}
}
