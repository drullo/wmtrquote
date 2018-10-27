//#region Imports
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { QuoteService } from '@services/quote.service';
import { TestForm } from '@model/test-form';
import { MaterialDeliveryService } from '@services/material-delivery.service';
//#endregion

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: [
    './test.component.css',
    '../../styles/form.css',
    '../../styles/mat-tooltip.css'
  ]
})
export class TestComponent implements OnInit {
  //#region Fields
  deliveryOptions: string[];
  filteredDeliveryOptions: Observable<string[]>;
  specificationFocused = false; // used to dynamically expand the height when focused
  additionalFocused = false; // used to dynamically expand the height when focused
  //#endregion

  //#region Properties
  get tests(): TestForm[] {
    return this.quoteService.quote.tests;
  }

  get form(): TestForm {
    return this.editNum !== -1 && this.editForm ?
      this.editForm :
      this.tests[this.tests.length - 1];
  }

  get machineTest(): boolean {
    const value = this.form.get('machineTest').value;

    return value === 'Yes' || value === 'Machine Only';
  }

  private get editNum(): number {
    return +(this.route.snapshot.paramMap.get('num') || -1);
  }

  private get editForm(): TestForm {
    return this.editNum === -1 ? null : this.tests[this.editNum];
  }
  //#endregion

  //#region Lifecycle
  constructor(public quoteService: QuoteService,
    private materialDeliveryService: MaterialDeliveryService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.editNum !== -1 && !this.editForm) {
      // Invalid
      this.router.navigate(['/test']);
      return;
    }

    if (this.editNum === -1) {
      this.tests.push(new TestForm());
    }

    const testNum = this.editNum === -1 ?
      this.tests.length :
      this.editNum + 1;
    this.quoteService.currentStep = `Test #${testNum} Specification`;
    this.quoteService.currentStepNum = 2;

    // Get material delivery options
    this.materialDeliveryService.getAll()
      .subscribe(options => this.deliveryOptions = options);

    // Listen to changes in material delivery field to filter Autocomplete list
    const delivery = this.form.get('materialDelivery');
    this.filteredDeliveryOptions = delivery.valueChanges
      .pipe(
        startWith(''),
        map(value => this.deliveryFilter(value))
      );
  }
  //#endregion

  //#region Events
  ditchInvalid(): void {
    if (!this.form.valid) {
      const index = this.tests.indexOf(this.form);
      this.tests.splice(index, 1);
    }
  }
  //#endregion

  //#region Utilities
  private deliveryFilter(value: string): string[] {
    const filterValue = (value || '').toLowerCase();
    return this.deliveryOptions.filter(s => s.toLowerCase().includes(filterValue));
  }

  hasValue(name: string): boolean {
    const value = this.form.get(name).value;
    return value !== '' && value !== null;
  }
  //#endregion
}
