import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//backhotel
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { DashboardComponent } from './backhotel/dashboard/dashboard.component';
import { MainComponent } from './backhotel/main.component';
import { shareModule } from '../UIElements/shared.module';
import { pagesRoutingModule } from "./pages.routes";
import { HotelsComponent } from './backhotel/hotels/hotels.component';
import { PipesModule } from '../pipes/pipes.module';
import { RoomsComponent } from './backhotel/rooms/rooms.component';
import { AddRoomComponent } from './backhotel/rooms/add-room.component';
import { AddHotelComponent } from './backhotel/hotels/add-hotel.component';

// booking
import { MainComponentComponent } from './booking/main-component.component';
import { BookingRoomsComponent } from './booking/rooms/rooms.component';
import { PaxComponent } from './booking/pax/pax.component';
import { ConfirmComponent } from './booking/confirm/confirm.component';
import { InvoiceComponent } from './booking/invoice/invoice.component';
import { BookingsComponent } from './backhotel/bookings/bookings.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PipesModule,
        RouterModule,
        shareModule,
        pagesRoutingModule
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        DashboardComponent,
        MainComponent,
        HotelsComponent,
        RoomsComponent,
        AddRoomComponent,
        AddHotelComponent,
        MainComponentComponent,
        BookingRoomsComponent,
        PaxComponent,
        ConfirmComponent,
        InvoiceComponent,
        BookingsComponent,
    ],
    exports :[
        LoginComponent,
        RegisterComponent,
        DashboardComponent,
        MainComponent,
        HotelsComponent,
        MainComponentComponent,
        BookingRoomsComponent
    ]
})

export class pagesModule {}