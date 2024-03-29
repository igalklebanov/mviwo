import { MviwoSnackbarComponent } from './../../components/material/mviwo-snackbar/mviwo-snackbar.component';
import {
	MatSnackBar
} from '@angular/material';
import {
	Injectable
} from '@angular/core';

@Injectable()
export class NotificationService {

	constructor(
		private snackbar: MatSnackBar
	) {}

	public openSnackbar(message?: string, action?: string, duration?: number, extraClasses?: string) {
		return this.snackbar.open(message, action, {
			duration: duration || 2000,
			panelClass: extraClasses || ['mviwo-snackbar-dark']
		}).onAction();
	}

	public openCustomSnackbar(message?: string, action?: string, duration?: number, extraClasses?: string) {
		return this.snackbar.openFromComponent(MviwoSnackbarComponent, {
			data: {
				message: message,
				action: action
			},
			duration: duration || 2000,
			panelClass: extraClasses || ['mviwo-snackbar-dark'],
		}).onAction();
	}
}
