import { NgModule } from "@angular/core";
//UIELements
import { HeaderComponent } from './backhotel/header/header.component';
import { SidebarComponent } from './backhotel/sidebar/sidebar.component';
import { BreadcrumbsComponent } from './backhotel/breadcrumbs/breadcrumbs.component';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
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