import { Users } from './usersPassword' 
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userAuthenticated: boolean = false;

  showMenuEmitter = new EventEmitter<boolean>();
  delProduct: any;

  constructor(private router: Router, ) {}

  doLogin(users: Users) {
    
  }

  userIsAuthenticated() {
    return this.userAuthenticated;
  }

}
