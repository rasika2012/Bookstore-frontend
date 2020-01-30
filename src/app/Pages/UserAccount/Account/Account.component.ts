import { UserCredentials, AuthenticationService } from './../../../Services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-Account',
	templateUrl: './Account.component.html',
	styleUrls: ['./Account.component.scss']
})
export class AccountComponent implements OnInit {

	public user: UserCredentials;
	constructor(private auth: AuthenticationService) { }

	ngOnInit() {
		this.user = this.auth.getUserDetails();
	}

}
