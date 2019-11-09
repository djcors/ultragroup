import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
//UIELements
import { HeaderComponent } from './backhotel/header/header.component';
import { SidebarComponent } from './backhotel/sidebar/sidebar.component';
import { BreadcrumbsComponent } from './backhotel/breadcrumbs/breadcrumbs.component';
import { NotfoundComponent } from './notfound/notfound.component';


@NgModule({
    imports: [
        RouterModule,
        CommonModule
    ],
    declarations: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NotfoundComponent
    ],
    exports :[
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NotfoundComponent 
    ]
})

export class shareModule {}