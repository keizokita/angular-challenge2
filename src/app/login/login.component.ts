import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserPassword } from './userPassword';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  UsersPassword: UserPassword = new UserPassword();

  formLogin!: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  onSubmit() {
    console.log(this.UsersPassword);
    console.log(this.formLogin.getRawValue());
    this.authService.doLogin(this.formLogin.getRawValue());
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
