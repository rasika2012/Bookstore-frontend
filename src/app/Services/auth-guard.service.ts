import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

	constructor(private auth: AuthenticationService, private router: Router) { }

	canActivate() {
		if (!this.auth.isLoggedIn()) {
			this.router.navigateByUrl('/session/signin');
			return false;
		}
		return true;
	}
}
