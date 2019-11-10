import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from './services.index';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SidebarService
  ]
})
export class ServiceModule { }
