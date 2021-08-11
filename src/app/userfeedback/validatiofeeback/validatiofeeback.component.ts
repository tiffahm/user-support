import { Component, OnInit } from '@angular/core';
import { MessageserviceService } from 'src/app/services/messageservice.service';

@Component({
  selector: 'app-validatiofeeback',
  templateUrl: './validatiofeeback.component.html',
  styleUrls: ['./validatiofeeback.component.css']
})
export class ValidatiofeebackComponent implements OnInit {

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

    return this.messages.getValidationFeedback().subscribe((data : {})=>{
        console.log(data)

        this.messagedata= data ['messageConversations']
        this.count = this.messagedata.length
       })


}

}
