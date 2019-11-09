import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-book-open',
      path: '/backhotel/'
    },
    {
      title: 'Management',
      icon: 'mdi mdi-settings',
      children: [
        {
          title: 'Hotels',
          icon: 'mdi mdi-hospital-building',
          path: 'hotels'
        },
        {
          title: 'Rooms',
          icon: 'mdi mdi-hotel',
          path: 'rooms'
        }
      ]
    }
  ];
  constructor() { }
}
