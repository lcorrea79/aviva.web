import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appTwoCharsOrNone]',
  providers: [{ provide: NG_VALIDATORS, useExisting: TwoCharsOrNoneDirective, multi: true }],
})
export class TwoCharsOrNoneDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    const isInvalid = control.value && control.value.length !== 2;
    return isInvalid ? { twoCharsOrNone: { value: control.value } } : null;
  }
}
