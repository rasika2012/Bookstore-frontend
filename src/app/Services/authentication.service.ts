import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum UserRoles {
	Admin = 'Administrator',
	BussinessOwner = 'Bussiness Owner',
	User = 'User',
	Guest = 'Guest',
}

export interface TokenResponse {
	token: string;
}

export interface UserCredentials {
	phoneNo: string;
	password: string;
	role: UserRoles;
	email?: string;
	fname?: string;
	lname?: string;
	profileImg?: string;
	address?: string;
	exp?: number;
	iat?: number;
}

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	private token: string;
	// shared object to use in headers to tacle logins in middle of the process
	public user: UserCredentials = {
		phoneNo: undefined,
		password: undefined,
		role: undefined,
		profileImg: 'assets/images/not-logged-in-user.png'
	};

	constructor(
		private http: HttpClient,
		private router: Router,
	) { }

	private saveToken(token: string): void {
		localStorage.setItem('mean-auth-token', token);
		this.token = token;
	}

	private getToken(): string {
		if (!this.token) {
			this.token = localStorage.getItem('mean-auth-token');
		}
		return this.token;
	}

	public logout(): void {
		this.token = '';
		window.localStorage.removeItem('mean-auth-token');
		this.user = {
			phoneNo: undefined,
			password: undefined,
			role: undefined,
			profileImg: 'assets/images/user-5.jpg'
		};
		this.router.navigateByUrl('/');
	}

	public getUserDetails(): UserCredentials {
		const token = this.getToken();
		let payload;
		if (token) {
			payload = token.split('.')[1];
			payload = window.atob(payload);
			return JSON.parse(payload);
		} else {
			return null;
		}
	}

	public register(user: UserCredentials): Observable<any> {
		return this.request('post', 'register', false, user);
	}

	public login(user: UserCredentials): Observable<any> {
		return this.request('post', 'login', false, user);
	}

	public isLoggedIn(): boolean {
		const user = this.getUserDetails();
		if (user) {
			return user.exp > Date.now() / 1000;
		} else {
			return false;
		}
	}

	public getUserRole(): UserRoles {
		const user = this.getUserDetails();
		if (user && this.isLoggedIn()) {
			return user.role;
		} else {
			return null;
		}
	}

	public request(method: 'post' | 'get', url: string, isSecure: boolean, obj?: any): Observable<any> {
		let base;
		if (method === 'post') {
			if (isSecure) {
				base = this.http.post(`/api/${url}`, obj, { headers: { Authorization: `Bearer ${this.getToken()}` } });
			} else {
				base = this.http.post(`/api/${url}`, obj);
			}
		} else {
			base = this.http.get(`/api/${url}`, { headers: { Authorization: `Bearer ${this.getToken()}` } });
		}

		const request = base.pipe(
			map((data: TokenResponse) => {
				if (data.token) {
					this.saveToken(data.token);
				}
				return data;
			})
		);

		return request;
	}

	public updateLoggedInUserData(): void {
		this.user = this.getUserDetails();
	}
}
