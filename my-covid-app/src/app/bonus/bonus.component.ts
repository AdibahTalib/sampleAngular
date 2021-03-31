import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/environments/GlobalConstants';
import { GlobalMethods } from 'src/environments/GlobalMethods';
import { BonusService } from '../bonus.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.css']
})
export class BonusComponent implements OnInit {
  public covidTotalDaily: any;

  public covidTotalDescBonus: any[] = [];

  public desc: any;

  public descObjectBonus: any;

  public newDescBonus: any;

  public updateDescBonus: any;

  public postDescBonus: any;

  constructor(
    private httpClient: HttpClient,
    public bonusService: BonusService,
    private confirmationDialogService: ConfirmationDialogService

  ) { }

  ngOnInit(): void {
    this.descObjectBonus = {};
    this.updateDescBonus = {};
    this.postDescBonus = {};
    this.getCovid();
    this.getCovidDescBonus();
  }

  getCovid(): any {
    this.covidTotalDaily = this.bonusService.getCovid().subscribe((data: any) => {
      console.log(data); this.covidTotalDaily = data;
    }
      ,
      (error: { error: { message: string; }; }) => {
        console.log(error);
        this.confirmationDialogService.confirm(GlobalConstants.errorMessage, GlobalMethods.getError(error));
      }
    );

    return this.covidTotalDaily;
  }

  getCovidDescBonus(): any {
    this.bonusService.getCovidDescBonus().subscribe((data: any) => {
      console.log(data);
      this.covidTotalDescBonus = data;

      console.log("Covid Component Inited");
      console.log("Total of Description Column Row ---> " + this.covidTotalDescBonus.length);
    });

    return this.covidTotalDescBonus;
  }

// another method
  // async getCovidDesc(): Promise<any> {
  //   await this.covidApiService.getCovidDesc().toPromise().then((data:any) => {
  //     console.log(data);
  //     this.covidTotalDesc = data;
  //   });

  //   console.log("Covid Component Inited");
  //   console.log("Total of Description Column Row ---> " + this.covidTotalDesc.length);

  //   return this.covidTotalDesc;
  // }

  onSelectDescBonus(desc: any) {

    console.log("desc-->" + this.desc);
    if (this.desc[0]) {
      this.descObjectBonus = this.desc[0];
      console.log("desc id-->" + this.descObjectBonus.id);
      console.log("desc description-->" + this.descObjectBonus.description);
    }
  }

  deleteDescBonus() {
    console.log("covidTotalDesc length-->" + this.covidTotalDescBonus.length);

    if (this.covidTotalDescBonus.length == 0) {
      this.confirmationDialogService.confirm(GlobalConstants.errorMessageFE, "List is Empty");
    }
    else {
      this.bonusService.deleteDescBonus(this.descObjectBonus.id).then(
        resolve => {
          this.getCovidDescBonus();
        });
    }
  }

  addDescBonus() {
    this.bonusService.addDescBonus(this.newDescBonus).then(
      resolve => {
        this.getCovidDescBonus();
      });
  }

  onSelectUpdateDescBonus(desc: any) {

    console.log("updateDesc-->" + this.updateDescBonus);
    if (this.desc[0]) {
    
      let clonedDesc = Object.assign({}, this.desc[0]);
      // use a new cloned Object to prevent pass by reference value in the class
      this.updateDescBonus = clonedDesc;
      console.log("updateDesc id-->" + this.updateDescBonus.id);
      console.log("updateDesc description-->" + this.updateDescBonus.description);
    }
  }

  putDescBonus() {

    this.bonusService.putDescBonus(this.updateDescBonus).then(
      resolve => {
        this.getCovidDescBonus();
      });
  }

  addPostBonus() {

    this.bonusService.addPostBonus(this.postDescBonus).then(
      resolve => {
        this.getCovidDescBonus();
      });

    // if the method below being called using async way, then the table desc wont be updated accordingly after data added
    // this.getCovidDesc();   
  }
}
