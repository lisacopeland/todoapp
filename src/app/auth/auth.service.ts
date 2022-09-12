import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface SigninResponse {
    AccessToken: string;
    ExpiresIn: number;
    RefreshToken: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    apiUrl = `http://localhost:7179/auth`;

    constructor(private http: HttpClient) { }

    signIn(email: string, password: string) {
        const authenticationDetails = {
            Username: email,
            Password: password,
            Email: email
        };

        const url = `${this.apiUrl}/signin`;
        console.log('going to url ', url, 'search: ', authenticationDetails)
        const params = new HttpParams({ fromObject: authenticationDetails });
        return this.http.post<SigninResponse>(url, {}, { params });
    }

    signUp(email: string, password: string) {
        const authenticationDetails = {
            Username: email,
            Password: password,
            Email: email
        };
        const url = `${this.apiUrl}/register`;
        console.log('going to url ', url, 'search: ', authenticationDetails)
        const params = new HttpParams({ fromObject: authenticationDetails });
        return this.http.post<string>(url, { params });
    }

    signOut() {
        localStorage.removeItem('jwt');
    }

    confirmSignUp(email: string, confirmationCode: string) {
        const authenticationDetails = {
            ConfirmationCode: confirmationCode,
            Email: email
        };        
        const url = `${this.apiUrl}/confirm`;
        console.log('going to url ', url, 'search: ', authenticationDetails)
        const params = new HttpParams({ fromObject: authenticationDetails });
        return this.http.post<string>(url, { params });

    }

    resendConfirmationCode(email: string) {
        const authenticationDetails = {
            Email: email
        };
        const url = `${this.apiUrl}/resendconfirm`;
        console.log('going to url ', url, 'search: ', authenticationDetails)
        const params = new HttpParams({ fromObject: authenticationDetails });
        return this.http.post<string>(url, { params });
    }

    isLoggedIn(): boolean {
      const jwt = localStorage.getItem('jwt');
      return (jwt !== null);
    }
}