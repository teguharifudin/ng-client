import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from '../request.model';
import { ActivatedRoute, Router } from '@angular/router';

const BASE_URL = ['http://localhost:8005/']

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

	login(request: Request): Observable<any> {
		return this.http.post<any>(BASE_URL + 'auth/login', request, {headers: new HttpHeaders({ 'Content-Type': 'application/json' })}).pipe(map((response) => {
			sessionStorage.setItem('user', request.email);
			sessionStorage.setItem('token', 'Bearer ' + response.token);
      		// console.log(response.token);
			return response;
		}));
	}

	signup(request: Request): Observable<any> {
		return this.http.post<any>(BASE_URL + 'auth/signup', request, {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text' as 'json'}).pipe(map((response) => {                                                         
			return response;
		}));
	}

	me(): Observable<any>{
		return this.http.get<any>(BASE_URL + 'users/me', {responseType: 'text' as 'json'}).pipe(map((response) => {
			return response;
		}));
	}

	signout() {
		sessionStorage.removeItem('user');
		sessionStorage.removeItem('token');

		this.router.navigateByUrl('login');
	}

	isUserSignedin() {
		return sessionStorage.getItem('token') !== null;
	}

	getSignedinUser() {
		return sessionStorage.getItem('user') as string;
	}

	getToken() {
		let token = sessionStorage.getItem('token') as string;
		return token;
	}
}