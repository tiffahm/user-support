import { Component, OnInit } from '@angular/core';
import { DatasetService } from '../services/dataset.service';

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.css']
})
export class DatasetComponent implements OnInit {

  dataset : any []

  constructor(private alldatasets : DatasetService) { }

  ngOnInit(){
    this.getdatasets()
  }

  getdatasets() {
  

    return this.alldatasets.getAllDataSets().subscribe((data)=>{

      this.dataset = data ['dataSets']

      console.log(data)

    })


  }

}

