import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/environments/GlobalConstants';
import { GlobalMethods } from 'src/environments/GlobalMethods';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class BonusService {

  constructor(private httpClient: HttpClient, private confirmationDialogService: ConfirmationDialogService) { }

  public getCovid(): any {
    return this.httpClient.get(`http://localhost:8081/covid/get/latest`, { responseType: 'text' });
  }

  public getCovidDescBonus(): any {
    return this.httpClient.get(`http://localhost:8081/covid/get/bonus`);
  }

  public deleteDescBonus(id: number): Promise<any> {

    return new Promise((resolve) => {
      return this.httpClient.delete(`http://localhost:8081/covid/delete/bonus?id=` + id).subscribe((data: any) => {
        console.log(data);
        resolve(data);

      }
        ,
        (error) => {
          console.log(error);
          this.confirmationDialogService.confirm(GlobalConstants.errorMessage, GlobalMethods.getError(error));
        }
      )
    });
  }

  public addDescBonus(desc: string): Promise<any> {

    return new Promise((resolve) => {
      return this.httpClient.get(`http://localhost:8081/covid/add/bonus?desc=` + desc).subscribe((data: any) => {

        console.log(data);
        resolve(data);

      }
        ,
        (error) => {
          console.log(error);
          this.confirmationDialogService.confirm(GlobalConstants.errorMessage, GlobalMethods.getError(error));
        })

    });
  }

  public putDescBonus(body : any): Promise<any> {

    return new Promise((resolve) => {
      return this.httpClient.put(`http://localhost:8081/covid/put/bonus`, body).subscribe((data: any) => {

        console.log(data);
        resolve(data);

      }
        ,
        (error) => {
          console.log(error);
          this.confirmationDialogService.confirm(GlobalConstants.errorMessage, GlobalMethods.getError(error));
        })

    });
  }

  public addPostBonus(body: any): Promise<any> {
    return new Promise((resolve) => {
      return this.httpClient.post(`http://localhost:8081/covid/post/bonus`, body).subscribe((data: any) => {
        console.log(data);
        resolve(data);
      }
        ,
        (error) => {
          console.log(error);
          this.confirmationDialogService.confirm(GlobalConstants.errorMessage, GlobalMethods.getError(error));
        })
    });
  }

  public deleteSoapBonus(desc: string): Promise<any> {

    return new Promise((resolve) => {
      return this.httpClient.delete(`http://localhost:8081/covid/delete/soap/bonus?desc=` + desc).subscribe((data: any) => {
        console.log(data);
        resolve(data);

      }
        ,
        (error) => {
          console.log(error);
          this.confirmationDialogService.confirm(GlobalConstants.errorMessage, GlobalMethods.getError(error));
        }
      )
    });
  }

  deleteDuplicate(): Promise<any> {

    return new Promise((resolve) => {
      return this.httpClient.delete(`http://localhost:8081/covid/delete/duplicate/bonus`).subscribe((data: any) => {
        console.log(data);
        resolve(data);

      }
        ,
        (error) => {
          console.log(error);
          this.confirmationDialogService.confirm(GlobalConstants.errorMessage, GlobalMethods.getError(error));
        }
      )
    });
  }
}
