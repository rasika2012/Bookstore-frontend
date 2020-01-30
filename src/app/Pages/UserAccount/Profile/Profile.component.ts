import { UserCredentials, AuthenticationService } from './../../../Services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-Profile',
	templateUrl: './Profile.component.html',
	styleUrls: ['./Profile.component.scss']
})
export class ProfileComponent implements OnInit {

	public user: UserCredentials;

	constructor(private auth: AuthenticationService) { }

	ngOnInit() {
		this.user = this.auth.getUserDetails();
	}

}
