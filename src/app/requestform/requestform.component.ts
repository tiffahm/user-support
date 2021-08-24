import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxDhis2HttpClientService } from '@iapps/ngx-dhis2-http-client';
import { NotificationComponent } from '../notification/notification.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrganizationUnitsService } from '../services/organization-units.service';
import { DatasetService } from '../services/dataset.service';
import { makeID } from '../shared/helpers/make-id.helper';
import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs'
import { UserGroupsService } from '../services/user-groups.service';
@Component({
  selector: 'app-requestform',
  templateUrl: './requestform.component.html',
  styleUrls: ['./requestform.component.css']
})

export class RequestformComponent implements OnInit {

  selection_mode: 'orgUnit'
  selected_level: ''
  show_update_button: false
  selected_group: ''
  orgunit_levels: []
  orgunit_groups: []
  selected_orgunits: []
  user_orgunits: []
  show_selection_mode: false
  type: 'report' // can be 'data_entry'
  selected_user_orgunit: 'USER_ORGUNIT'

  checked = true;
  isDataAvailable = false;
  selectedunits = ''
  dataset : string 
  selecterdataset = ''
  loadingunits =false 
  myForm: FormGroup;
  durationInSeconds = 2;
  selectedgroup: any;

  orgunits = { name :" ", id : "" , dataSets : []}
  dsets = {id : "",displayName: ""}
  onOrgUnitSelect: any;
  loading: boolean;
  showFilter: boolean;
  isOrganizationUnitSelected: boolean;
  assignedDataSets: any;

  constructor( public units : OrganizationUnitsService ,
     public fb: FormBuilder ,
     private alldatasets : DatasetService,
     private request : NgxDhis2HttpClientService,
     private _snackBar: MatSnackBar,
     private usergroups : UserGroupsService
     
     ) { }

  ngOnInit(): void {
    this.getunits()
    this.getdatasets()
    this.reactiveForm()
    this.getuserGroups()
  }
  
  reactiveForm() {
    this.myForm =  this.fb.group({

    organizationunit: ['',[Validators.required]],
    datasetsunit: ['',[Validators.required]],
    
    
      
  })
        throw new Error('Method not implemented.');
  }

  setSelectedOrgunit(event) {
    this.getSelectedDataSets(event.value);
  }

  getSelectedDataSets(orgUnitID: string) {
    this.isOrganizationUnitSelected = true;
    this.onOrgUnitSelect.emit(this.isOrganizationUnitSelected);
    this.loading = true;
    this.showFilter = true;
    this.units.getOrganisationUnit(orgUnitID).add(response => {
      
      this.loading = false;
      this.assignedDataSets = Object.assign([], response.dataSets);
    })
  }




  getunits(){
    this.isDataAvailable = true

       return this.units.getorganizationunits().subscribe((data : {}) =>{

        this.isDataAvailable = true
         
      console.log(data)

       this.selectedunits = data ['organisationUnits']
      
       })

  }
  getdatasets() {
  

   
    return this.alldatasets.getAllDataSets().subscribe((data)=>{
      this.isDataAvailable = true
      this.dataset = data ['dataSets']

      console.log(data)

    })


  }
  compareunitsandsets(){



  }

  getuserGroups(){

    return this.usergroups.getuserGroups().subscribe (( data : {})=>{
      console.log(data)

      this.selectedgroup = data ['userGroups']

     
    })

  }



  submitForm(){

    const requestPayload =  {
      "subject":"REQUEST FOR APROVAL CHANGE IN DATASET",
      "text": "There is request to update datasets to ," +this.myForm.get('organizationunit').value+"  add the follwing data " + this.myForm.get('datasetsunit').value +"",
      "userGroups": [
        {
          "id": "QYrzIjSfI8z"
        }
      ]
    }

    const requestobject =  {
       id : makeID(),
      "Action":"REQUEST FOR APROVAL CHANGE IN DATASET",
      "datasets_added": this.myForm.get('datasetsunit').value,
      "datasets_removed":  this.myForm.get('datasetsunit').value,
      "organizationunit": +this.myForm.get('organizationunit').value,
      "userGroups": [
        {
          "id": "QYrzIjSfI8z"
        }
      ]
    }
    

    console.log(this.myForm)

    this.request.post('users.json',requestPayload).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )

    
    this.request.post('messageConversations?messageType=TICKET&messageConversationStatus=OPEN',requestPayload).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
    this.request.post('dataStore/UserSupportApp/'+requestobject.id+'.json',requestobject).subscribe(
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
