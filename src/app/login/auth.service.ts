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

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  validEmail(email: any) {
    return this.http.get<User>(`${this.API}?email=${email}`);
  }

  doLogin(users: Users) {
    this.validEmail(users.email).subscribe((emailReturned: any) => {
      if (Array.isArray(emailReturned)) {
        if (emailReturned.length > 0) {
          console.log(emailReturned.length);
          this.userAuthenticated = true;

          this.showMenuEmitter.emit(true);

          this.router.navigate(['/users']);
        } else {
          console.log(this.userAuthenticated);
          this.userAuthenticated = false;
          this.showMenuEmitter.emit(false);
          this.openToast();
        }
      }
    });
  }

  userIsAuthenticated() {
    return this.userAuthenticated;
  }
  

  openToast() {
    this.toastr.error('Login Inválido', 'Atenção!');
  }

  setLoggedUser(userData: any){
    try {
      let userDataString = JSON.stringify(userData);
      localStorage.setItem('loggedUser', userDataString);
    } catch (error) {
      console.log(error)
    }
  }

  // Função para recuperar os dados do usuário logado
  getLoggedUser(){
    try {
      let userDataString: any = localStorage.getItem('loggedUser');
      let userData = JSON.parse(userDataString)
      return userData;
    } catch (error) {
      console.log(error)
      return null;
    }
  }

}
