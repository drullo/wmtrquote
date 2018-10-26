//#region Imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { QuoteService } from '@services/quote.service';
import { TestForm } from '@model/test-form';
//#endregion

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
  //#region Fields
  columns = [
    { name: 'edit', icon: 'edit' },
    { name: 'delete', icon: 'delete' },
    { name: 'testNum', caption: 'Test #' },
    { name: 'type', caption: 'Type' },
    { name: 'material', caption: 'Material', hiddenMobile: true },
    { name: 'samples', caption: '# of Samples', hiddenMobile: true },
    { name: 'specification', caption: 'Specification', hiddenMobile: true }
  ];

  displayedColumns = this.columns.map(c => c.name);
  //#endregion

  //#region Properties
  get dataSource(): MatTableDataSource<TestForm> {
    return new MatTableDataSource<any>(this.quoteService.quote.tests);
  }
  //#endregion

  //#region Lifecycle
  constructor(private router: Router,
    public quoteService: QuoteService) { }

  ngOnInit() {
    this.quoteService.currentStep = 'Tests';
    this.quoteService.currentStepNum = 2;

    this.checkForNoTests();
  }
  //#endregion

  //#region Events
  editDelete(col: string, test: TestForm) {
    const index = this.quoteService.quote.tests.findIndex(t => t.get('timeStamp').value === test.get('timeStamp').value);

    if (col === 'delete') {
      this.quoteService.quote.tests.splice(index, 1);
      this.checkForNoTests();
    } else {
      this.router.navigate(['/test', index]);
    }
  }
  //#endregion

  //#region Utilities
  isIcon(col: string): boolean {
    return this.columns.find(c => c.name === col).icon !== undefined;
  }

  isHiddenMobile(col: string): boolean {
    return this.columns.find(c => c.name === col).hiddenMobile;
  }

  caption(col: string): string {
    return this.columns.find(c => c.name === col).caption;
  }

  value(col: string, test: TestForm = null) {
    return this.isIcon(col) ?
      this.columns.find(c => c.name === col).icon :
      col === 'testNum' ?
        this.quoteService.quote.tests.findIndex(t => t.get('timeStamp').value === test.get('timeStamp').value) + 1 :
        test.get(col).value;
  }

  private checkForNoTests(): void {
    if (this.quoteService.quote.tests.length === 0) {
      this.router.navigate(['/test']);
    }
  }
  //#endregion
}
