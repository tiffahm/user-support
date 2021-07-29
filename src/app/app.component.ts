import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { Fn } from '@iapps/function-analytics';
import { MatDialog } from '@angular/material/dialog';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { RequestformComponent } from './requestform/requestform.component';
import { DhisdataService } from './dhisdata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = "dhis2"

  constructor(
    private translate: TranslateService,
    private titleService: Title,
    public dialog : MatDialog,
    public   user: DhisdataService 
    
    ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('en');

    // Set application title
    this.setTitle('Seed application');

    if (Fn) {
      Fn.init({
        baseUrl: '../../../'
      });
    }
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  onapicall()
{
  this.user.getData().subscribe((data)=>{
    console.warn(data);
  this.title = data ['title'];
  })
}   
openDialog(){
   this.dialog.open(ResetpasswordComponent);
 }

 openuserDialog(){
   this.dialog.open(RequestformComponent);
 }
  
}

