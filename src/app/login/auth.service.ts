import { Users } from './usersPassword';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../usersList/users.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API = 'https://gorest.co.in/public/v2/users';

  private userAuthenticated: boolean = false;

  showMenuEmitter = new EventEmitter<boolean>();
  delProduct: any;

  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService) {}

  validEmail(email: any) {
    return this.http.get<User>(`${this.API}/?${email}`);
  }

  doLogin(users: Users) {
    this.validEmail(users).subscribe((emailReturned: any) => {
      if (emailReturned) {
        console.log(users);
        this.userAuthenticated = true;

        this.showMenuEmitter.emit(true);

        this.router.navigate(['/users']);
      } else 
      {
        this.userAuthenticated = false;
        this.showMenuEmitter.emit(false);
        this.openToast();
      }
    });
  }

  userIsAuthenticated() {
    return this.userAuthenticated;
  }

  openToast() {
    this.toastr.error('Login Inválido', 'Atenção!');
  }
}
