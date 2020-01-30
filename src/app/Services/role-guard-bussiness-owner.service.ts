import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';

@Injectable({
	providedIn: 'root'
})
export class RoleGuardBussinessOwnerService {

	constructor(private auth: AuthenticationService, private router: Router, private notification: NotificationService) { }

	canActivate() {
		if (this.auth.getUserDetails().role === 'Bussiness Owner') {
			return true;
		} else {
			this.notification.showNotification('Unautherized!');
			return false;
		}
	}
}
