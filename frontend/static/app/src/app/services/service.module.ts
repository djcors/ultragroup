import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from './services.index';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    SidebarService,
    AuthGuard
  ]
})
export class ServiceModule { }
