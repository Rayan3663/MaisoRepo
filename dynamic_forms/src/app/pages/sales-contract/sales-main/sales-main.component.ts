import { Component } from '@angular/core';

@Component({
  selector: 'app-sales-main',
  templateUrl: './sales-main.component.html',
  styleUrls: ['./sales-main.component.css']
})
export class SalesMainComponent {
  displaySearchComponent = false;
  displayContractComponent=false;
  displayInstallmentComponent=false;

 
  showSearchComponent() {
    this.displaySearchComponent = true;
    this.displayContractComponent=false;
    this.displayInstallmentComponent=false;
  }
  showContractComponent()
  {
this.displayContractComponent=true;
this.displaySearchComponent = false;
this.displayInstallmentComponent=false;
  }
  showInstallmentComponent()
  {
    this.displayInstallmentComponent=true;
    this.displayContractComponent=false;
    this.displaySearchComponent = false;
  }

}
