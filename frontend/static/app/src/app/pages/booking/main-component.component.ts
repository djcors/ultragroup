import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styles: []
})
export class MainComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.body.classList.add('single-column');
    document.body.classList.remove('fix-header');
  }

}
