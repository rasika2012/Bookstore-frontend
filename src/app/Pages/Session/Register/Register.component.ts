import { Router } from '@angular/router';
import { UserCredentials, UserRoles, AuthenticationService } from './../../../Services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
	selector: 'embryo-Register',
	templateUrl: './Register.component.html',
	styleUrls: ['./Register.component.scss']
})
export class RegisterComponent implements OnInit {

	public rPassword: string = undefined;

	public user: UserCredentials = {
		phoneNo: undefined,
		fname: undefined,
		lname: undefined,
		password: undefined,
		role: UserRoles.Admin,
		email: undefined,
	};

	constructor(private router: Router, private notificationService: NotificationService, private auth: AuthenticationService) { }

	ngOnInit() {
	}

	public register(): void {
		if (this.user.password !== this.rPassword) {
			this.notificationService.showNotification('Password and confirm password mismatch');
			return;
		}
		if (this.user.phoneNo === undefined || this.user.fname === undefined || this.user.lname === undefined) {
			this.notificationService.showNotification('Name and Phone number are required');
		} else {
			this.auth.register(this.user).subscribe(() => {
				this.notificationService.showNotification('Successfully saved!');
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
