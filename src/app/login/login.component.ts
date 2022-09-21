import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from './usersPassword';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usersPassword: Users = new Users();

  form!: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // this.form = this.fb.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: [
    //     '',
    //     [
    //       Validators.required,
    //       Validators.minLength(5),
    //       Validators.maxLength(20),
    //     ],
    //   ],
    // });
  }

  onSubmit() {
    this.authService.doLogin(this.usersPassword);
  }

  verifyValidTouched(campo: any) {
    return !campo.valid && campo.touched;
  }

  aplyCssError(campo: any) {
    return {
      'is-invalid': this.verifyValidTouched(campo),
      'has-feedback': this.verifyValidTouched(campo),
    };
  }
}
