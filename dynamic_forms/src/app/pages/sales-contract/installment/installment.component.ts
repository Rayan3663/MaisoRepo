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
DynamicForm!: FormGroup;

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

  constructor(private fb : FormBuilder){}
  
  ngOnInit(): void {
    this.DynamicForm = this.fb.group({
      CashPrice : ['', Validators.required],
      InitialPrice : ['', Validators.required],
      Calculation1 : ['', Validators.required],
      FinalPrice : ['', Validators.required],
      InitialNPV : ['', Validators.required],
      Plan : ['', Validators.required],
      Intent : ['', Validators.required], // radio button label,
      
    })
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
      this.DynamicForm.addControl('dynamicField1', new FormControl(''));
    } else if (this.DropDownVal === 'Finance2') {
      console.log("2nd");
      this.DynamicForm.addControl('dynamicField2', new FormControl(''));
    }
  }


  GridActions = ["Action 1", "Action 2", "Action 3", "Action 4"]

  
    gridData = [
      { slNo: 1, Date: 'Chai', DescriptionEnglish : 'Sample Description', Description: 'Sample Description', Percent:99, Type: 'Delivery', Amount : 300, CashValue : 215, Actions:this.GridActions, isSelected: false },
      { slNo: 1, Date: 'Chai', DescriptionEnglish : 'Sample Description', Description: 'Sample Description', Percent:99, Type: 'Delivery', Amount : 300, CashValue : 215, Actions:this.GridActions, isSelected: false },
      { slNo: 1, Date: 'Chai', DescriptionEnglish : 'Sample Description', Description: 'Sample Description', Percent:99, Type: 'Delivery', Amount : 300, CashValue : 215, Actions:this.GridActions, isSelected: false },
      { slNo: 1, Date: 'Chai', DescriptionEnglish : 'Sample Description', Description: 'Sample Description', Percent:99, Type: 'Delivery', Amount : 300, CashValue : 215, Actions:this.GridActions, isSelected: false },
      { slNo: 1, Date: 'Chai', DescriptionEnglish : 'Sample Description', Description: 'Sample Description', Percent:99, Type: 'Delivery', Amount : 300, CashValue : 215, Actions:this.GridActions, isSelected: false },
      { slNo: 1, Date: 'Chai', DescriptionEnglish : 'Sample Description', Description: 'Sample Description', Percent:99, Type: 'Delivery', Amount : 300, CashValue : 215, Actions:this.GridActions, isSelected: false }

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

    // Add logic to determine row color based on data (e.g., even/odd)
    if (dataItem.index % 2 === 0) {
      rowClass = 'even-row';
    } else {
      rowClass = 'odd-row';
    }

    return rowClass;
  }

    areaList = ["hello", "hello", "hello", "hello"];

  currentBtnTab: string = 'Installments'; 

  MenuTabClicked(BtnClicked: string) {
    this.currentBtnTab = BtnClicked;
  }
}

