import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './backhotel/main.component';
import { DashboardComponent } from './backhotel/dashboard/dashboard.component';
import { HotelsComponent } from './backhotel/hotels/hotels.component';
import { AuthGuard } from '../services/services.index';

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
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(pagesRoutes)],
    exports: [RouterModule]
})
export class pagesRoutingModule { }