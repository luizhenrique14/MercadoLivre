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
  formResetSenha: FormGroup;
  senhasIguais: boolean = true;
  validPassword: IValidPassword = {
    message: '',
    valid: true,
  };

  openAlert = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.formResetSenha = this.fb.group({
      login: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      confirmarSenha: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  register() {
    let login = this.formResetSenha.get('login')?.value
    let senha = this.formResetSenha.get('senha')?.value;
    let confirmarSenha =
      this.formResetSenha.get('confirmarSenha')?.value;

    this.senhasIguais = matchingPasswordsValidator(
      senha,
      confirmarSenha
    );
    this.validPassword = passwordComplexityValidator(senha);
    if (
      this.formResetSenha.valid &&
      this.senhasIguais &&
      this.validPassword.valid
    ) {
      this.authService.register(login,senha).subscribe(
        (ret) => {
          console.log('ret', ret);

        },
        (error) => {      
          console.error('Erro ao registrar')  
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
