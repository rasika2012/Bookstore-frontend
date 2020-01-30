import { UserCredentials } from './../../Services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
	selector: 'embryo-HeaderUserProfileDropdown',
	templateUrl: './HeaderUserProfileDropdown.component.html',
	styleUrls: ['./HeaderUserProfileDropdown.component.scss']
})
export class HeaderUserProfileDropdownComponent implements OnInit {

	constructor(public auth: AuthenticationService) { }

	ngOnInit() {
		if (this.auth.isLoggedIn()) {
			this.auth.updateLoggedInUserData();
		}
	}

	public logout(): void {
		this.auth.logout();
	}

}
