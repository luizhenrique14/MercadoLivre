import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  openAlertError = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    const login = this.loginForm.get('login')?.value;
    const senha = this.loginForm.get('senha')?.value;
    this.authService.login(login, senha).subscribe(
      () => {
        this.router.navigate(['/home']);
      },
      (error) => {        
        this.openAlertError = true;
        setTimeout(() => {
          this.openAlertError = false;
      }, 5000);
        console.error('Login failed', error);
      }
    );
    // if (this.loginForm.valid) {
    //   this.router.navigate(['/home']);
    // }
  }

}
