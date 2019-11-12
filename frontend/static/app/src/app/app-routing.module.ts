import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './UIElements/notfound/notfound.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/login/register.component';
import { MainComponentComponent } from './pages/booking/main-component.component';


const routes: Routes = [
  {path: '', component: MainComponentComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: RegisterComponent},
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
