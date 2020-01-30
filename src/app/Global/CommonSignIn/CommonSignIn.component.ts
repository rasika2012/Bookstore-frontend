import { UserCredentials, UserRoles, AuthenticationService } from './../../Services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
	selector: 'embryo-SignIn',
	templateUrl: './CommonSignIn.component.html',
	styleUrls: ['./CommonSignIn.component.scss']
})
export class CommonSignInComponent implements OnInit {

	public user: UserCredentials = {
		phoneNo: undefined,
		password: undefined,
		role: UserRoles.User,
	};

	constructor(private auth: AuthenticationService, private router: Router, private notificationService: NotificationService) { }

	ngOnInit() {
	}

	public login(): void {
		if (this.user.phoneNo === undefined || this.user.password === undefined ) {
			this.notificationService.showNotification('Enter Phone number and password to login');
		} else {
			this.auth.login(this.user).subscribe(() => {
				this.notificationService.showNotification('Successfully login');
				this.auth.updateLoggedInUserData();
				this.router.navigateByUrl('/home');
			},
			(err) => {
				if (err.error.message) {
					this.notificationService.showNotification(err.error.message);
				}
			});
		}
	}

}
