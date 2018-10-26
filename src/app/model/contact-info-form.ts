import { FormGroup, FormControl, Validators } from '@angular/forms';

export class ContactInfoForm extends FormGroup {
  constructor() {
    const controls = {
      'company': new FormControl(),
      'contact': new FormControl('', Validators.required),
      'title': new FormControl(),
      'address': new FormControl(),
      'city': new FormControl(),
      'state': new FormControl(),
      'zip': new FormControl(),
      'country': new FormControl(),
      'phone': new FormControl('', Validators.required),
      'email': new FormControl('', [ Validators.required, Validators.email ])
    };

    super(controls);
  }
}
