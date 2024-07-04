export function passwordComplexityValidator(password: string): IValidPassword {
    if (!password) {
      return { valid: false, message: 'A senha está vazia.' };
    }
  
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNumber = /\d/.test(password);
    const validLength = password.length >= 8 && password.length <= 16;
  
    if (!hasUpperCase) {
      return { valid: false, message: 'A senha deve conter pelo menos uma letra maiúscula.' };
    }
  
    if (!hasSpecialChar) {
      return { valid: false, message: 'A senha deve conter pelo menos um caractere especial.' };
    }
  
    if (!hasNumber) {
      return { valid: false, message: 'A senha deve conter pelo menos um número.' };
    }
  
    if (!validLength) {
      return { valid: false, message: 'A senha deve ter entre 8 e 16 caracteres.' };
    }
  
    return { valid: true, message: 'A senha atende aos critérios de complexidade.' };
  }
  


export function matchingPasswordsValidator(
  novaSenha: string,
  confirmaSenha: string
): boolean {
  return novaSenha === confirmaSenha ? true : false;
}

export interface IValidPassword{ valid: boolean, message: string }
