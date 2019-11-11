import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './backhotel/main.component';
import { DashboardComponent } from './backhotel/dashboard/dashboard.component';
import { HotelsComponent } from './backhotel/hotels/hotels.component';
import { AuthGuard } from '../services/services.index';
import { RoomsComponent } from './backhotel/rooms/rooms.component';
import { AddRoomComponent } from './backhotel/rooms/add-room.component';
import { AddHotelComponent } from './backhotel/hotels/add-hotel.component';

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
    }
];

@NgModule({
    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [RouterModule]
})
export class pagesRoutingModule { }