import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  matchingPasswordsValidator,
  passwordComplexityValidator,
  IValidPassword,
} from '../../../shared/validator';

@Component({
  selector: 'app-reset-senha',
  templateUrl: './reset-senha.component.html',
  styleUrls: ['./reset-senha.component.css'],
})
export class ResetSenhaComponent implements OnInit {
  formResetSenha: FormGroup;
  senhasIguais: boolean = true;
  validPassword: IValidPassword = {
    message: '',
    valid: true,
  };

  constructor(private fb: FormBuilder) {
    this.formResetSenha = this.fb.group({
      login: ['', [Validators.required]],
      codVerificacao: ['', [Validators.required]],
      novaSenha: ['', [Validators.required, Validators.minLength(8)]],
      confirmarNovaSenha: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    let novaSenha = this.formResetSenha.get('novaSenha')?.value;
    let confirmarNovaSenha =
      this.formResetSenha.get('confirmarNovaSenha')?.value;

    this.senhasIguais = matchingPasswordsValidator(
      novaSenha,
      confirmarNovaSenha
    );

    this.validPassword = passwordComplexityValidator(novaSenha);
    if (
      this.formResetSenha.valid &&
      this.senhasIguais &&
      this.validPassword.valid
    ) {
      console.log('formulario ok');
    } else {
      console.log('formulario nao ok');
    }
  }
}
