import { Injectable } from '@angular/core';
import { ContactInfoForm } from '@model/contact-info-form';
import { TestForm } from '@model/test-form';
import { AdditionalInfoForm } from '@model/additional-form';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  currentStep: string;
  currentStepNum: number;
  steps = 4;
  outlineFields = false;

  quote: {
    contactInfo: ContactInfoForm,
    tests: TestForm[],
    additional: AdditionalInfoForm,
    attachments: string[]
  };

  constructor() {
    this.initialize();
  }

  initialize(): void {
    this.quote = {
      contactInfo: new ContactInfoForm(),
      tests: [],
      additional: new AdditionalInfoForm(),
      attachments: []
    };
  }
}
