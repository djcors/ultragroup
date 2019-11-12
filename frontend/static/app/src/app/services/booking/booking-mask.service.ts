import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import {BehaviorSubject} from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingMaskService {
  public state = {};
  constructor(
    public activeRouter: ActivatedRoute,
    private router: Router
  ) { 
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let route = this.router.routerState.snapshot.root;
      do {
        const params = route.params;
        const keys = Object.keys(params);
        if (keys.length > 0) {
          keys.forEach(key => {
            const val = params[key];
            if (this.state[key]) {
              this.state[key].next(val);
            } else {
              this.state[key] = new BehaviorSubject(val);
            }
          });
        }
        route = route.firstChild;
      } while (route);
    });
  }

  param(key) {
    if (! this.state[key]) {
      this.state[key] = new BehaviorSubject(null);
    }
    return this.state[key]._value;
  }

}
