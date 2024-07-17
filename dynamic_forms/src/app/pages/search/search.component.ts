import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ButtonSize } from '@progress/kendo-angular-buttons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchForm!: FormGroup;
 public bankList:Array<string>=['Item1','Item2','Item3'];
 public defaultItem:string="[Please Select]";
  showmenu = true;
  showResult = false;
  
  dummyData: any[] = [
    {
      contractNo: '001',
      unitNumber: 'U001',
      customers: 'Customer A',
      component: 'Component X',
      property: 'Property 1',
      status: 'Active',
      purpose: 'Purpose A',
      contractDateStart: '2023-01-01',
      contractDateTo: '2023-12-31',
      flowVersion: '1.0',
      stepAny: 'Step 1',
      salesAgent: 'Agent A',
      broker: 'Broker A',
      morgageBank: 'Bank A',
      issueDate: '2023-01-01',
      unitMark: 'Mark A',
      amount: '1000'
    },
    {
      contractNo: '002',
      unitNumber: 'U002',
      customers: 'Customer B',
      component: 'Component Y',
      property: 'Property 2',
      status: 'Inactive',
      purpose: 'Purpose B',
      contractDateStart: '2023-02-01',
      contractDateTo: '2023-11-30',
      flowVersion: '1.1',
      stepAny: 'Step 2',
      salesAgent: 'Agent B',
      broker: 'Broker B',
      morgageBank: 'Bank B',
      issueDate: '2023-02-01',
      unitMark: 'Mark B',
      amount: '2000'
    },
    {
      contractNo: '003',
      unitNumber: 'U003',
      customers: 'Customer C',
      component: 'Component Z',
      property: 'Property 3',
      status: 'Pending',
      purpose: 'Purpose C',
      contractDateStart: '2023-03-01',
      contractDateTo: '2023-10-31',
      flowVersion: '1.2',
      stepAny: 'Step 3',
      salesAgent: 'Agent C',
      broker: 'Broker C',
      morgageBank: 'Bank C',
      issueDate: '2023-03-01',
      unitMark: 'Mark C',
      amount: '3000'
    },
    {
      contractNo: '004',
      unitNumber: 'U004',
      customers: 'Customer D',
      component: 'Component W',
      property: 'Property 4',
      status: 'Completed',
      purpose: 'Purpose D',
      contractDateStart: '2023-04-01',
      contractDateTo: '2023-09-30',
      flowVersion: '1.3',
      stepAny: 'Step 4',
      salesAgent: 'Agent D',
      broker: 'Broker D',
      morgageBank: 'Bank A',
      issueDate: '2023-04-01',
      unitMark: 'Mark D',
      amount: '4000'
    },
    
  ];
  searchResults: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    console.log("serach")
    this.searchForm = this.fb.group({
      contractNo: [''],
      unitNumber: [''],
      customers: [''],
      component: [''],
      property: [''],
      status: [''],
      purpose: [''],
      contractDateStart: [''],
      contractDateTo: [''],
      flowVersion: [''],
      stepAny: [''],
      salesAgent: [''],
      broker: [''],
      morgageBank: [this.defaultItem]
    });
  }

  menu() {
    this.showmenu = true;
    this.showResult = false;
  }

  Results() {
    this.showResult = true;
    this.showmenu = false;
  }

  onSearch() {
    console.log(this.searchResults); 
    const formValue = this.searchForm.value;
    this.searchResults = this.dummyData.filter(data => data.contractNo === formValue.contractNo || data.unitNumber===formValue.unitNumber);
    this.Results();
    console.log(this.searchResults); 
  }
}
