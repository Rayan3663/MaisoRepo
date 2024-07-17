import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { setInitialPrice } from 'src/app/store/form.actions';
import { AppState } from 'src/app/store/form.reducer';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  contractDetailsForm!: FormGroup;
  utilitiesDataToDisplay: any[] = [];
  initialUtilitiesData: any[] = [];
  private storeSubscription: Subscription;

  utilitiesData = [
    { number: 1, utilityType: 'Electricity', calc: 'Fixed', price: 100, start: '2023-01-01', end: '2023-12-31', termsPlan: 'Annual', contractType: 'Standard' }
  ];
  salesAgentsData = [
    
  ];

  constructor(private fb: FormBuilder, private store: Store<{ contractDetails: AppState }>) {}

  ngOnInit(): void {
    console.log("Contract")
    this.contractDetailsForm = this.fb.group({
      general: this.fb.group({
        number: [''],
        status: [''],
        documentStatus: [''],
        overseas: [false],
        legal: [false],
        contNo: [''],
        purpose: [''],
        interest: [''],
        discount: ['']
      }),
      dates: this.fb.group({
        issueDate: [''],
        deliveryDate: [''],
        revisedDeliveryDate: [''],
        commissionDate: [''],
        startDate: [''],
        gracePeriod: [''],
        delayInterest: ['']
      }),
      unit: this.fb.group({
        unitNo: [''],
        unitMarkNo: [''],
        bookingNo:[''],
        bookingFees:['']
      }),
      mortgage: this.fb.group({
        underMortgage: [true],
        mortgageBank: ['']
      }),
      channel: this.fb.group({
        factor: [''],
        source: ['']
      }),
      misc: this.fb.group({
        remarksE: [''],
        remarksA: ['']
      }),
      finance: this.fb.group({
        askingPrice: [0],
        egp:[''],
        options: [0],
        modifications: [0],
        comm:[0],
        com1:[0],
        com2:[0],
        minAskPrice:[''],
        extraFees: [0],
        initialPrice:[0],
        dis:[0],
        per:[0],
        net:[0],
        util:[0],
        gross:[0],
        // discounts: [0],
        // netPrice: [0],
        // grossPrice: [0]
      })
    });
    this.utilitiesDataToDisplay = this.initialUtilitiesData;

    this.contractDetailsForm.get('unit.unitNo')?.valueChanges.subscribe(value => {
      this.updateUtilitiesTable(value);
    });
    this.contractDetailsForm.get('finance.askingPrice')?.valueChanges.subscribe(value => {
      this.updateInitialPrice(value);
    });
    

    this.storeSubscription = this.store.select('contractDetails').subscribe(state => {
      console.log('State from store:', state); // Debug the state

      if (state) {
        this.contractDetailsForm.patchValue(state);
      }
    });
  
  }
  ngOnDestroy(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }
  updateInitialPrice(newPrice: number) {
    console.log('Dispatching setInitialPrice action with:', newPrice);
    this.store.dispatch(setInitialPrice({ initPrice: newPrice }));
  }


  updateUtilitiesTable(unitNo: string) {
    if (unitNo === 'SW-0112-00-00-LX') {
      this.utilitiesDataToDisplay = this.utilitiesData;
    } else {
      this.utilitiesDataToDisplay = this.initialUtilitiesData;
    }
  }
  }
