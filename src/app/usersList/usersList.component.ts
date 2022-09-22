import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './users.model';

@Component({
  selector: 'app-users',
  templateUrl: './usersList.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users?: User[];

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.service.list().subscribe(dados => this.users = dados);
  }

}
