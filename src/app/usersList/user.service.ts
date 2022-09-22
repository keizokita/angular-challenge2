import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './users.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API = 'https://gorest.co.in/public/v2/users';

  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<User[]>(this.API);
  }
}
