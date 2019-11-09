import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/backhotel/dashboard/dashboard.component';
import { NotfoundComponent } from './UIElements/notfound/notfound.component';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/backhotel/main.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/login/register.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'backhotel',
    component: MainComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      }
    ]
  },
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
