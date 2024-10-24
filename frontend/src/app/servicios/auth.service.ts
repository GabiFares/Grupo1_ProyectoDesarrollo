import { inject, Injectable } from '@angular/core';
import { FetchService } from './fetch.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiSerivce: FetchService = inject(FetchService);
  async login(body: string) {
    try {
      const response = await this.apiSerivce.post('auth/login', body);
      localStorage.setItem('token', response.token);
    } catch (error) {
      console.log(error);
    }
  }

  async registro(body: string): Promise<any> {
    try {
      const response = await this.apiSerivce.post('usuarios/', body);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  Logut() {
    localStorage.removeItem('token');
  }
  isValidUser(): boolean {
    return !!localStorage.getItem('token');
  }
  constructor() {}
}
