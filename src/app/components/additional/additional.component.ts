//#region Imports
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { QuoteService } from '@services/quote.service';
import { ReferralService } from '@services/referral.service';
import { RepService } from '@services/rep.service';
//#endregion

@Component({
  selector: 'app-additional',
  templateUrl: './additional.component.html',
  styleUrls: [
    './additional.component.css',
    '../../styles/form.css',
    '../../styles/mat-tooltip.css'
  ]
})
export class AdditionalComponent implements OnInit {
  //#region Fields
  referrals: string[];
  reps: string[];
  filteredReferrals: Observable<string[]>;
  filteredReps: Observable<string[]>;
  otherFocused = false; // used to dynamically expand the height when focused
  //#endregion

  //#region Properties
  get form(): FormGroup {
    return this.quoteService.quote.additional;
  }

  get sortAttachments(): string[] {
    return this.quoteService.quote.attachments.sort();
  }
  //#endregion

  //#region Lifecycle
  constructor(public quoteService: QuoteService,
    private referralService: ReferralService,
    private repService: RepService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    // Toolbar title
    this.quoteService.currentStep = 'Additional Info';
    this.quoteService.currentStepNum = 3;

    this.referralService.getAll().subscribe(referrals => this.referrals = referrals);

    this.repService.getAll().subscribe(reps => this.reps = reps);

    // Listen to changes in referral field to filter Autocomplete list
    const referral = this.form.get('referral');
    this.filteredReferrals = referral.valueChanges
      .pipe(
        startWith(''),
        map(value => this.referralFilter(value))
      );

    // Listen to changes in rep field to filter Autocomplete list
    const rep = this.form.get('rep');
    this.filteredReps = rep.valueChanges
      .pipe(
        startWith(''),
        map(value => this.repFilter(value))
      );
  }
  //#endregion

  //#region Events
  uploadFile(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      const name = files[i].name.toLowerCase();

      if (this.quoteService.quote.attachments.indexOf(name) === -1) {
        this.quoteService.quote.attachments.push(name);
        this.toastr.success(`'${name}' uploaded`);
      } else {
        this.toastr.warning(`'${name}' is a duplicate`, 'Duplicate File Rejected');
      }
    }
  }

  removeUpload(file: string): void {
    const index = this.quoteService.quote.attachments.indexOf(file);
    this.quoteService.quote.attachments.splice(index, 1);

    this.toastr.success(`'${file}' removed`);
  }
  //#endregion

  //#region Utilities
  private referralFilter(value: string): string[] {
    const filterValue = (value || '').toLowerCase();
    return this.referrals.filter(s => s.toLowerCase().includes(filterValue));
  }

  private repFilter(value: string): string[] {
    const filterValue = (value || '').toLowerCase();
    return this.reps.filter(s => s.toLowerCase().includes(filterValue));
  }

  hasValue(name: string): boolean {
    const value = this.form.get(name).value;
    return value !== '' && value !== null;
  }
  //#endregion
}
