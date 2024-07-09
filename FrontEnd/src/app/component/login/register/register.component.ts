import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  matchingPasswordsValidator,
  passwordComplexityValidator,
  IValidPassword,
} from '../../../shared/validator';
import { AuthService } from 'src/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formResetPassword: FormGroup;
  passwordsIguals: boolean = true;
  validPassword: IValidPassword = {
    message: '',
    valid: true,
  };

  openAlert = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.formResetPassword = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  register() {
    let login = this.formResetPassword.get('login')?.value
    let password = this.formResetPassword.get('password')?.value;
    let confirmPassword =
      this.formResetPassword.get('confirmPassword')?.value;

    this.passwordsIguals = matchingPasswordsValidator(
      password,
      confirmPassword
    );
    this.validPassword = passwordComplexityValidator(password);
    if (
      this.formResetPassword.valid &&
      this.passwordsIguals &&
      this.validPassword.valid
    ) {
      this.authService.register(login,password).subscribe(
        (ret) => {
          console.log('ret', ret);
        },
        (error) => {      
          console.error('Erro ao registrar', error)  
        }
      );
      this.openAlert = true;
      setTimeout(() => {
        this.openAlert = false;
        this.router.navigate(['/login']);
    }, 5000); 
    } else {
      console.error('Erro ao registrar novo usuário');
    }
  }
}
