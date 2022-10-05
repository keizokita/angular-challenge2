import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { UserService } from './user.service';
import { User } from './users.model';

@Component({
  selector: 'app-users',
  templateUrl: './usersList.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users?: User[];

  formSearch!: FormGroup;

  nameSearch = new FormControl();

  readonly SEARCH_URL = 'https://gorest.co.in/public/v2/users';

  filter = new FormControl();

  filterUsers: boolean = false;
  
  userlogged: any;

  constructor(
    private service: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.formSearch = this.fb.group({
      nameSearch: [null],
    });
    this.service.list().subscribe((dados) => (this.users = dados));
  }

  onEdit(id: any) {
    this.router.navigate(['edit', id], { relativeTo: this.route });
    this.service.list().subscribe((dados) => (this.users = dados));
  }

  onSearch() {
    console.log(this.nameSearch.value);

    this.http
      .get<User[]>(this.SEARCH_URL + '?name=' + this.nameSearch.value)
      .subscribe((dados) => (this.users = dados));

    console.log(this.SEARCH_URL + '?name=' + this.nameSearch.value);
  }

  onFilterActive() {
    console.log('filtradoActive');
    this.filterUsers = true;
    if (this.filterUsers == true) {
      this.http
        .get<User[]>(this.SEARCH_URL + '?status=active')
        .subscribe((dados) => (this.users = dados));
    } else {
      this.service.list().subscribe((dados) => (this.users = dados));
    }
  }

  onFilterInactive() {
    console.log('filtradoInactive');
    this.filterUsers = true;
    if (this.filterUsers == true) {
      this.http
        .get<User[]>(this.SEARCH_URL + '?status=inactive')
        .subscribe((dados) => (this.users = dados));
    } else {
      this.service.list().subscribe((dados) => (this.users = dados));
    }
  }

  onFilterNothing() {
    console.log('filtradoTodos');
    this.service.list().subscribe((dados) => (this.users = dados));
  }

  onLogout() {
    localStorage.removeItem('email');
  }
}
