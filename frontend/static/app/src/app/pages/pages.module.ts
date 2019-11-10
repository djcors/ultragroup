import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//pages
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './login/register.component';
import { DashboardComponent } from './backhotel/dashboard/dashboard.component';
import { MainComponent } from './backhotel/main.component';
import { shareModule } from '../UIElements/shared.module';
import { pagesRoutingModule } from "./pages.routes";
import { HotelsComponent } from './backhotel/hotels/hotels.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        shareModule,
        pagesRoutingModule
    ],
    declarations: [
        LoginComponent,
        HomeComponent,
        RegisterComponent,
        DashboardComponent,
        MainComponent,
        HotelsComponent
    ],
    exports :[
        LoginComponent,
        HomeComponent,
        RegisterComponent,
        DashboardComponent,
        MainComponent,
        HotelsComponent
    ]
})

export class pagesModule {}