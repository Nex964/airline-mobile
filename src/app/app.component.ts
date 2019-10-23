import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web';

  hideNav = false;

  constructor(private router: Router){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if(this.router.url.indexOf('/ticket') == 0){
          this.hideNav = true;
        }
        else{
          this.hideNav = false;
        }
    }
    });
  }
}
