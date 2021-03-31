import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/environments/GlobalConstants';
import { BonusService } from '../bonus.service';
import { BonusComponent } from '../bonus/bonus.component';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-covid-delete',
  templateUrl: './covid-delete.component.html',
  styleUrls: ['../share/css/share.component.css']
})
export class CovidDeleteComponent implements OnInit {

  public deleteSoapDescBonus: any;

  constructor(
    private httpClient: HttpClient,
    public bonusService: BonusService,
    public bonusComponent: BonusComponent,
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  ngOnInit(): void {
    this.deleteSoapDescBonus = {};
  }

  deleteSoapBonus() {
    console.log("covidTotalDesc length-->" + this.bonusComponent.covidTotalDescBonus.length);

    if (this.bonusComponent.covidTotalDescBonus.length == 0) {
      this.confirmationDialogService.confirm(GlobalConstants.errorMessageFE, "List is Empty");
    }
    else {
      this.bonusService.deleteSoapBonus(this.deleteSoapDescBonus.description).then(
        resolve => {
          this.bonusComponent.getCovidDescBonus();
        });
    }
  }

  deleteDuplicate() {
    console.log("covidTotalDesc length-->" + this.bonusComponent.covidTotalDescBonus.length);

    if (this.bonusComponent.covidTotalDescBonus.length == 0) {
      this.confirmationDialogService.confirm(GlobalConstants.errorMessageFE, "List is Empty");
    }
    else {
      this.bonusService.deleteDuplicate().then(
        resolve => {
          this.bonusComponent.getCovidDescBonus();
        });
    }
  }
}
