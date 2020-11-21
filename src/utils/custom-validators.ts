import { ValidatorFn, AbstractControl } from '@angular/forms';
export const  customEmailValidator = (): ValidatorFn => {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const email: String = control.value;
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return !(email.match(mailformat))? {'invalid': {value: control.value}} : null;
    };
  }

