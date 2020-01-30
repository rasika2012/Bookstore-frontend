import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root'
})
export class NotificationService {

	constructor(private snack: MatSnackBar) { }

	public showNotification(message: string): void {
		this.snack.open(message, 'close', {
			duration: 2000,
		});
	}
}
