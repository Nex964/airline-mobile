import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @ViewChild('mainNav', {static: true}) mainNav;

  constructor() { 
  }

  ngOnInit() {
    setTimeout(() => {
      this.mainNav.nativeElement.classList.add('collapse');
    }, 1500);
  }

}
