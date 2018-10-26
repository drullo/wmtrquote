//#region Imports
import { Component, OnInit } from '@angular/core';
import { QuoteService } from '@services/quote.service';
import { TestForm } from '@model/test-form';
//#endregion

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  private contactInfo = [
    { name: 'company', caption: 'Company' },
    { name: 'contact', caption: 'Name' },
    { name: 'title', caption: 'Title' },
    { name: 'phone', caption: 'Phone' },
    { name: 'email', caption: 'Email' }
  ];

  private addressInfo = [
    { name: 'address', caption: 'Address' },
    { name: 'city', caption: 'City' },
    { name: 'state', caption: 'State' },
    { name: 'zip', caption: 'Zip' },
    { name: 'country', caption: 'Country' }
  ];

  get validContactInfo() {
    return this.contactInfo
      .filter(i => this.getValue('contactInfo', i.name) !== '');
  }

  get validAddressInfo() {
    return this.addressInfo
      .filter(i => this.getValue('contactInfo', i.name) !== '');
  }

  get hasAdditional(): boolean {
    return this.validAdditionalInfo(false).length > 0 ||
      this.validAdditionalInfo(true).length > 0 ||
      this.quoteService.quote.attachments.length > 0;
  }

  validAdditionalInfo(longFields: boolean) {
    const info = [];

    if (longFields) {
      const value = this.quoteService.quote.additional.get('other').value;

      if (value) {
        info.push({ key: 'other', caption: 'Other Details',
          value: value.toString().replace(/\n/g, '<br />') });
      }
    } else {
      Object.keys(this.quoteService.quote.additional.controls)
        .forEach(key => {
          if (key === 'other') { return; }

          const value = this.quoteService.quote.additional.get(key).value;
          let caption: string;

          switch (key) {
            case 'rep': caption = 'WMT&R Representative'; break;
            case 'time': caption = 'Turnaround Time'; break;
            case 'referral': caption = 'Referral'; break;
          }

          if (value) {
            info.push( { key, caption, value });
          }
        });
      }

      return info;
  }

  constructor(public quoteService: QuoteService) { }

  ngOnInit(): void {
    this.quoteService.currentStep = 'Review Request';
    this.quoteService.currentStepNum = 4;
  }

  getValue(form: string, name: string) {
    switch (form) {
      case 'contactInfo':
        let value = this.quoteService.quote.contactInfo.get(name).value;
        if (name === 'country') {
          value = value.name;
        }

        return (value || '')
          .toString().replace(/\n/g, '<br />') ;
    }
  }

  validTestInfo(test: TestForm, longFields: boolean): any[] {
    const info = [];

    if (longFields) {
      ['specification', 'additionalInfo'].forEach(key => {
        const value = test.get(key).value;

        if (!value) { return; }

        info.push({ key,
          value: (value || '')
            .toString().replace(/\n/g, '<br />'),
          caption: key === 'additionalInfo' ?
            'Additional Info' :
            'Specification'});
      });
    } else {
      Object.keys(test.controls)
        .forEach(key => {
          if (key === 'timeStamp' ||
            key === 'tempScale' ||
            key === 'specification' ||
            key === 'additionalInfo') {
            return;
          }

          const value = key === 'temp' ?
            `${test.get(key).value}° ${test.get('tempScale').value}` :
            test.get(key).value;
          let caption: string;

          switch (key) {
            case 'type' : caption = 'Type'; break;
            case 'machineTest': caption = 'Machining'; break;
            case 'samples': caption = 'Samples'; break;
            case 'material': caption = 'Material'; break;
            case 'hardness': caption = 'Hardness'; break;
            case 'temp': caption = 'Temperature'; break;
            case 'materialDelivery': caption = 'Delivery Form'; break;
            case 'materialDimmensions': caption = 'Dimmensions'; break;
          }

          if (value) {
            info.push({ key, value, caption });
          }
        });
      }

      return info;
  }
}
