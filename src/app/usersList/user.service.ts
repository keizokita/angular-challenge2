import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './users.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API = 'https://gorest.co.in/public/v2/users';

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<User[]>(this.API);
  }

  loadByID(id: any) {
    return this.http.get<User>(`${this.API}/${id}`);
  }

  // loadByName(name: any) {
  //   return this.http.get<User>(`${this.API}?name=${name}`);
  // }

  create(users: any) {
    return this.http.post(this.API, users).subscribe();
  }

  update(users: any) {
    return this.http.put(`${this.API}/${users.id}`, users);
  }

  save(users: any) {
    if (users.id) {
      return this.update(users).subscribe();
    } else {
      return this.create(users);
    }
  }

  remove(id: any) {
    return this.http.delete(`${this.API}/${id}`);
  }
}
