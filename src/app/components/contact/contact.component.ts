//#region Imports
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CountryService } from '@services/country.service';
import { StateService } from '@services/state.service';
import { Country } from '@model/country';
import { CityService } from '@services/city.service';
import { EmailErrorStateMatcher } from '@model/email-error-matcher';
import { QuoteService } from '@services/quote.service';
import { State } from '@model/state';
//#endregion

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: [
    './contact.component.css',
    '../../styles/form.css'
  ]
})
export class ContactComponent implements OnInit {
  //#region Fields
  matcher = new EmailErrorStateMatcher();

  countries: Country[];
  states: State[];
  cities: string[];
  filteredStates: Observable<State[]>;
  filteredCities: Observable<string[]>;

  addressFocused = false; // used to dynamically expand the height when focused
  //#endregion

  //#region Properties
  get form(): FormGroup {
    return this.quoteService.quote.contactInfo;
  }

  get email() {
    return this.form.get('email');
  }
  //#endregion

  //#region Lifecycle
  constructor(private countryService: CountryService,
    private stateService: StateService,
    private cityService: CityService,
    public quoteService: QuoteService) { }

  ngOnInit() {
    // Toolbar title
    this.quoteService.currentStep = 'Contact Info';
    this.quoteService.currentStepNum = 1;

    // Get countries
    this.countryService.getAll()
      .subscribe(countries => {
        this.countries = countries;

        // Default to US
        const us = this.countries.find(c => c.name === 'United States of America');
        this.form.get('country').setValue(us);
      });

    // Get states
    this.stateService.getAll()
      .subscribe(states => this.states = states);

    // Get cities
    this.cityService.getAll()
      .subscribe(cities => this.cities = cities);

    // Listen to changes in state field to filter Autocomplete list
    const state = this.form.get('state');
    this.filteredStates = state.valueChanges
      .pipe(
        startWith(''),
        map(value => this.stateFilter(value))
      );

    // Listen to changes in city field to filter Autocomplete list
    const city = this.form.get('city');
    this.filteredCities = city.valueChanges
      .pipe(
        startWith(''),
        map(value => this.cityFilter(value))
      );
  }
  //#endregion

  //#region Events
  stateFromAbbreviation(): void {
    const state = this.quoteService.quote.contactInfo.get('state');
    const value = state.value;

    if (!value || value.toString().length !== 2) {
      return;
    }

    const stateLookup = this.states.find(s => s.abbreviation.toLowerCase() === value.toString().toLowerCase());

    if (stateLookup) {
      state.setValue(stateLookup.name);
    }
  }
  //#endregion

  //#region Utilities
  private stateFilter(value: string): State[] {
    const filterValue = (value || '').toLowerCase();

    return this.states
      .filter(s => s.name.toLowerCase().includes(filterValue) ||
        s.abbreviation.toLowerCase().includes(filterValue));
  }

  private cityFilter(value: string): string[] {
    const filterValue = (value || '').toLowerCase();
    return this.cities.filter(s => s.toLowerCase().includes(filterValue));
  }

  hasValue(name: string): boolean {
    const value = this.form.get(name).value;
    return value !== '' && value !== null;
  }
  //#endregion
}
