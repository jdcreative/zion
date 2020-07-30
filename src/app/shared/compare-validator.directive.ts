import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[appConfirmValidator]',
  providers: [{
    provide: NG_VALIDATORS, 
    useExisting: CompareValidatorDirective, 
    multi: true
  }]
})
export class CompareValidatorDirective implements Validator {
  @Input() appConfirmValidator: string;

  validate(c: AbstractControl): {[key: string]: any} | null {
    const controlToCompare = c.parent.get(this.appConfirmValidator);
    if(controlToCompare && controlToCompare.value !== c.value){
      return {'notEqual': true};
    };
    return null;
  }
}
