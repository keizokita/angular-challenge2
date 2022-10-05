import { CreateUserComponent } from './create-user/create-user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './usersList/usersList.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'users', canActivate: [AuthGuard], component: UsersComponent },

  {
    path: 'users/create',
    canActivate: [AuthGuard],

    component: CreateUserComponent,
  },

  {
    path: 'users/edit/:id',
    canActivate: [AuthGuard],

    component: CreateUserComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
