import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from './services.index';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { BookingMaskService } from './booking/booking-mask.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    SidebarService,
    BookingMaskService,
    AuthGuard
  ]
})
export class ServiceModule { }
