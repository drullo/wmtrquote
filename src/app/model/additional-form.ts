import { FormGroup, FormControl } from '@angular/forms';

export class AdditionalInfoForm extends FormGroup {
  constructor() {
    const controls = {
      'rep': new FormControl(),
      'time': new FormControl(),
      'other': new FormControl(),
      'referral': new FormControl()
    };

    super(controls);
  }
}
