import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly API = ''

  private _user = signal<any | null>(null);

  isAuthenticated = computed(() => !!this._user());

  constructor() {
    this.restoreSession();
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.API}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.API}/login`, credentials).pipe(
      tap(res => this.setSession(res)),
      shareReplay()
    );
  }

  private setSession(authRes: any) {
    localStorage.setItem('access_token', authRes.accessToken);
    localStorage.setItem('refresh_token', authRes.refreshToken);
    this._user.set(authRes.user);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this._user.set(null);
    this.router.navigate(['/login']);
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  private restoreSession() {
    const token = this.getAccessToken();
    if (token) {
      // validar o token ou buscar o perfil
      this._user.set({ token }); 
    }
  }

  refreshToken(): Observable<any> {
    const refresh = localStorage.getItem('refresh_token');
    return this.http.post(`${this.API}/refresh`, { refresh }).pipe(
      tap((res: any) => localStorage.setItem('access_token', res.access))
    );
  }

}
