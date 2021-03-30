import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mining',
  templateUrl: './mining.component.html',
  styleUrls: ['./mining.component.css']
})
export class MiningComponent implements OnInit {

  constructor(
    // Inject your HTTP Client Service here
    private httpClient: HttpClient,
    ) {
    
  }

  ngOnInit(): void {
    // this.getCovid();

  }

  mining: string = "Covid Mining Services";

  input: string = "";

  public getBasicMining(): any {
    this.httpClient.get(`http://localhost:8091/covid/mining/my`, { responseType: 'text' })
      .subscribe((data: any) => 
                  {
                    // assign HTTP response with local variable
                    this.input = data;
                  }
                );   
  }
}
