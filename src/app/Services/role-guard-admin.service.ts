import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { NotificationService } from './notification.service';

@Injectable({
	providedIn: 'root'
})
export class RoleGuardAdminService implements CanActivate {

	constructor(private auth: AuthenticationService, private router: Router, private notification: NotificationService) { }

	canActivate() {
		if (this.auth.getUserDetails().role === 'Administrator') {
			return true;
		} else {
			this.notification.showNotification('Unautherized!');
			return false;
		}
	}
}
