import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { CreateUserComponent } from './create-user/create-user.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './usersList/usersList.component';

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
