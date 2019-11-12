import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//UIELements
import { HeaderComponent } from './backhotel/header/header.component';
import { SidebarComponent } from './backhotel/sidebar/sidebar.component';
import { BreadcrumbsComponent } from './backhotel/breadcrumbs/breadcrumbs.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PipesModule } from '../pipes/pipes.module';
import { BookingMaskComponent } from './booking/booking-mask/booking-mask.component';


@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PipesModule
    ],
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NotfoundComponent,
        BookingMaskComponent
    ],
    exports :[
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        BookingMaskComponent,
        NotfoundComponent,
    ]
})

export class shareModule {}