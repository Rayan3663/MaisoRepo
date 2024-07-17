import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ButtonSize } from '@progress/kendo-angular-buttons';
import { PagerPosition, PagerType } from '@progress/kendo-angular-grid';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/form.reducer';


@Component({
  selector: 'app-installment',
  templateUrl: './installment.component.html',
  styleUrls: ['./installment.component.css']
})
export class InstallmentComponent implements OnInit {
  DropDownVal!: string;
  installmentForm!: FormGroup;
  initPrice: number = 0; 
 private storeSubscription: Subscription | undefined;
  
  public size: ButtonSize = "none";
  public value: Date = new Date(2000, 2, 10);
  
  
     public pagerTypes = ["numeric", "input"];
  
    public type: PagerType = "numeric";
    public buttonCount = 5;
    public info = true;
    public pageSizes = [2, 5, 10, 20];
    public previousNext = true;
    public position: PagerPosition = "bottom";
  
    public pageSize = 5;
    public skip = 0;
  
    constructor(private fb : FormBuilder, private store: Store<{ contractDetails: AppState }>){}
    
    ngOnInit(): void {
      this.installmentForm = this.fb.group({
        upperSec: this.fb.group({
          initPrice: [''],
          CashPrice: [''],
          disInt: [''],
          perc: [''],
          finalPrice: [''],
          initialNpv: [''],
          loss: [''],
          percent: [''],
          finalNpv: ['']
        }),
        lowerSec: this.fb.group({
          plan: [''],
          interestRate: [''],
          asOfDate: [''],
          check1: [true],
          check2: [true],
          answer: ['no']
        })
      });
  
    
      this.storeSubscription = this.store.select('contractDetails').subscribe(state => {
        if (state) {
          this.initPrice = state.initPrice; 
          this.installmentForm.patchValue({
            upperSec: {
              initPrice: this.initPrice 
            }
          });
        }
       if(state==undefined)
       {
        this.initPrice=50;
       }
      });
    }
      getDropDownValue(event : any){
           this.DropDownVal = event.target.value;
          //  debugger;
          this.changeFields();
      }
  
      changeFields(){
        // debugger;
        if (this.DropDownVal === 'Finance1') {
          console.log("1st");
        this.installmentForm.addControl('dynamicField1', new FormControl(''));
      } else if (this.DropDownVal === 'Finance2') {
        console.log("2nd");
        this.installmentForm.addControl('dynamicField2', new FormControl(''));
      }
    }
  
    
      gridData = [
        { slNo: 1, Date: 'Chai', DescriptionEnglish : 'Sample Description', Description: 'Sample Description', Percent:99, Type: 'Delivery', Amount : 300, CashValue : 215,  isSelected: false },
        { slNo: 1, Date: 'Chai', DescriptionEnglish : 'Sample Description', Description: 'Sample Description', Percent:99, Type: 'Delivery', Amount : 300, CashValue : 215,  isSelected: false },
        { slNo: 1, Date: 'Chai', DescriptionEnglish : 'Sample Description', Description: 'Sample Description', Percent:99, Type: 'Delivery', Amount : 300, CashValue : 215,  isSelected: false },
        { slNo: 1, Date: 'Chai', DescriptionEnglish : 'Sample Description', Description: 'Sample Description', Percent:99, Type: 'Delivery', Amount : 300, CashValue : 215,  isSelected: false },
        { slNo: 1, Date: 'Chai', DescriptionEnglish : 'Sample Description', Description: 'Sample Description', Percent:99, Type: 'Delivery', Amount : 300, CashValue : 215,  isSelected: false },
        { slNo: 1, Date: 'Chai', DescriptionEnglish : 'Sample Description', Description: 'Sample Description', Percent:99, Type: 'Delivery', Amount : 300, CashValue : 215,  isSelected: false }
  
      ];
  
          UtilityData = [
        { Number: 1, Date: 'Chai', DescriptionEnglish : 'Sample Description', Description: 'Sample Description', Percent:99, Type: 'Delivery', Amount : 300,  isSelected: false },
        { Number: 1, Date: 'Chai', DescriptionEnglish : 'Sample Description', Description: 'Sample Description', Percent:99, Type: 'Delivery', Amount : 300,  isSelected: false },
        { Number: 1, Date: 'Chai', DescriptionEnglish : 'Sample Description', Description: 'Sample Description', Percent:99, Type: 'Delivery', Amount : 300,  isSelected: false },
        { Number: 1, Date: 'Chai', DescriptionEnglish : 'Sample Description', Description: 'Sample Description', Percent:99, Type: 'Delivery', Amount : 300,  isSelected: false },
        { Number: 1, Date: 'Chai', DescriptionEnglish : 'Sample Description', Description: 'Sample Description', Percent:99, Type: 'Delivery', Amount : 300,  isSelected: false },
        { Number: 1, Date: 'Chai', DescriptionEnglish : 'Sample Description', Description: 'Sample Description', Percent:99, Type: 'Delivery', Amount : 300,  isSelected: false }
  
      ];
  
      public rowClass(context: any): string {
      const dataItem = context.dataItem;
      let rowClass = '';
      if (dataItem.index % 2 === 0) {
        rowClass = 'even-row';
      } else {
        rowClass = 'odd-row';
      }
  
      return rowClass;
    }
  
      areaList = ["hello", "hello", "hello", "hello"];
  
    currentCity: string = 'Installments'; 
  
    openCity(cityName: string) {
      this.currentCity = cityName;
    }
}

