import { Component } from '@angular/core';
import { RouterOutlet, NavigationStart, NavigationEnd, Router, Event } from '@angular/router';
import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    './css/bootstrap.mincbed.css',
    './css/font-awesome.mincbed.css',
    './css/googleCss.css',
    './css/megamenucbed.css',
    './css/owl.carouselcbed.css',
    './css/pgwslider.mincbed.css',
    './css/style.mincbed.css'
  ],
  animations: [
    trigger('routeAnimations', [
      transition('HomePage => WatchPage', [
        style({ transform: 'translateX(-50%)' }),
        animate('200ms ease-out')
      ]),
      transition('WatchPage => HomePage', [
        style({ transform: 'translateX(50%)' }),
        animate('200ms ease-in')
      ])
    ])
  ]
})

export class AppComponent {
  title = 'app';
  showLoader = true;
  constructor(private _router: Router) {
    this._router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoader = true;
      }
      else if (routerEvent instanceof NavigationEnd) {
        this.showLoader = false
      }
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    debugger;
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
