import {
	AbstractControl,
	ValidatorFn
} from '@angular/forms';

export class ArrayValidators {
	/**
	 * checks if control's value has at least 'min' items.
	 * @param min
	 */
	public static minLengthValidator(min: number): ValidatorFn {
		return (control: AbstractControl): {
			[key: string]: any
		} => {
			if (control.value === null || control.value === undefined || control.value.length >= min) {
				return null;
			}

			return {
				'minLength': {
					value: control.value
				}
			};
		};
	}
}
