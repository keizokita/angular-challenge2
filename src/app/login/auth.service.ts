import { UserPassword} from './userPassword';
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

  doLogin(users: UserPassword) {
    this.validEmail(users.email).subscribe((listReturned: any) => {
      if (Array.isArray(listReturned)) {
        if (listReturned.length > 0 && users.password !== "123456") {
          console.log(listReturned.length);
          this.userAuthenticated = true;
          localStorage.setItem('email', users.email);
          //localStorage.setItem('list', listReturned.id);
          console.log(listReturned);
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

  // Função para recuperar os dados do usuário logado
  getLoggedUser() {
    if (localStorage.getItem('email') !== '') {
      this.userAuthenticated = true;
    }
  }

  getLoggedName() {

  }
}
