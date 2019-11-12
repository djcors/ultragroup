import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

// backhotel
import { MainComponent } from './backhotel/main.component';
import { DashboardComponent } from './backhotel/dashboard/dashboard.component';
import { HotelsComponent } from './backhotel/hotels/hotels.component';
import { AuthGuard } from '../services/services.index';
import { RoomsComponent } from './backhotel/rooms/rooms.component';
import { AddRoomComponent } from './backhotel/rooms/add-room.component';
import { AddHotelComponent } from './backhotel/hotels/add-hotel.component';
import { MainComponentComponent } from './booking/main-component.component';

//booking
import { BookingRoomsComponent } from './booking/rooms/rooms.component';
import { PaxComponent } from './booking/pax/pax.component';
import { ConfirmComponent } from './booking/confirm/confirm.component';

const pagesRoutes: Routes = [
    {
        path: 'backhotel',
        component: MainComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'hotels',
                component: HotelsComponent
            },
            {
                path: 'hotels/add',
                component: AddHotelComponent
            },
            {
                path: 'hotels/:id',
                component: AddHotelComponent
            },
            {
                path: 'rooms',
                component: RoomsComponent,
            },
            {
                path: 'rooms/add',
                component: AddRoomComponent
            },
            {
                path: 'rooms/:id',
                component: AddRoomComponent
            }
        ]
    },
    {
        path: 'booking',
        component: MainComponentComponent,
        children: [
            {
                path: 'rooms/:location/:arrive/:deperture/:pax',
                component: BookingRoomsComponent
            },
            {
                path: 'pax/:booking',
                component: PaxComponent
            },
            {
                path: 'confirm/:booking',
                component: ConfirmComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [RouterModule]
})
export class pagesRoutingModule { }