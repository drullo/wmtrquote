import { FormGroup, FormControl, Validators } from '@angular/forms';

export class TestForm extends FormGroup {
  constructor() {
    const controls = {
      // 'testNum': new FormControl(quoteService.quote.tests.length + 1),
      'timeStamp': new FormControl(new Date()),
      'type': new FormControl('', Validators.required),
      'machineTest': new FormControl('', Validators.required),
      'samples': new FormControl(1, Validators.required),
      'material': new FormControl('', Validators.required),
      'hardness': new FormControl(),
      'temp': new FormControl('Room'),
      'tempScale': new FormControl('F'),
      'specification': new FormControl(),
      'additionalInfo': new FormControl(),

      'materialDelivery': new FormControl(),
      'materialDimmensions': new FormControl()
    };

    super(controls);

    // If machineTest is set to anything other than No, require materialDelivery and materialDimmensions
    this.get('machineTest').valueChanges
      .subscribe(value => {
        const delivery = this.get('materialDelivery');
        const dimmensions = this.get('materialDimmensions');

        if (value === 'No') {
          delivery.clearValidators();
          dimmensions.clearValidators();
          delivery.setValue(null);
          dimmensions.setValue(null);
        } else {
          delivery.setValidators(Validators.required);
          dimmensions.setValidators(Validators.required);
        }

        delivery.updateValueAndValidity();
        dimmensions.updateValueAndValidity();
      });
  }
}
