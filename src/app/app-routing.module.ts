import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { SheetDetailsViewComponent } from './sheet-details-view/sheet-details-view.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  {path:'', redirectTo:"home", pathMatch:"full"},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeViewComponent, canActivate: [AuthGuardService]},
  {path: 'sheetDetails/:cid', component: SheetDetailsViewComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
