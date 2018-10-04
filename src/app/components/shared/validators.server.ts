import { FormControl } from '@angular/forms';

export class ValidatorsService {
  checkEmptyString(control: FormControl): {[s: string]: boolean} {
    if (control.value !== null && control.value.trim().length === 0) {
      return {'EmptyString': true};
    } else {
      return null;
    }
  }
}
