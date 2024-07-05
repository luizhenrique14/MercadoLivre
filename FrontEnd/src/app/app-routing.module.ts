import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ResetSenhaComponent } from './component/login/reset-senha/reset-senha.component'; // Componente de redefinição de senha
import { HomeComponent } from './component/home/home.component';
import { CartComponent } from './component/cart/cart.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'reset-senha', component: ResetSenhaComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
