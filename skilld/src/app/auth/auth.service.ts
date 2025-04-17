// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:5000/api/auth';

//   constructor(private http: HttpClient,) { }
  
//   register(userData: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/register`, userData);
//   }

//   login(credentials: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/login`, credentials);
//   }
// }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private userSubject = new BehaviorSubject<{ name: string } | null>(null);

  constructor(private http: HttpClient) {
    // Load stored user data when the service initializes
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  //  Set user and update BehaviorSubject
  setUser(user: { name: string }) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  //  Get user as an observable
  getUser(): Observable<{ name: string } | null> {
    return this.userSubject.asObservable();
  }
}
