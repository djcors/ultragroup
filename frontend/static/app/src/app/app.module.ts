import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './UIElements/notfound/notfound.component';
import { DashboardComponent } from './pages/backhotel/dashboard/dashboard.component';
import { HeaderComponent } from './UIElements/backhotel/header/header.component';
import { SidebarComponent } from './UIElements/backhotel/sidebar/sidebar.component';
import { BreadcrumbsComponent } from './UIElements/backhotel/breadcrumbs/breadcrumbs.component';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/backhotel/main.component';
import { RegisterComponent } from './pages/login/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotfoundComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    HomeComponent,
    MainComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
