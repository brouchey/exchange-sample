import { Component } from '@angular/core';

import { trigger, style, animate, transition } from '@angular/animations';
 
@Component({
	template:  `
		<nav class="navbar fixed-top submenu-fixed-top navbar-expand navbar-light bg-lightblue navbar-shadow" [@slideIn]>
			<ul class="navbar-nav mr-auto font-weight-light">
				<li class="nav-item">
					<a class="nav-link" routerLink="/exchange" routerLinkActive="selected-menu text-primary" [routerLinkActiveOptions]="{exact: true}">
						<div class="d-md-none">
							<i class="fas fa-comments fa-lg fa-fw" aria-hidden="true"></i>
						</div>
						<div class="d-none d-md-block">Échange</div>
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" routerLink="/exchange/me" routerLinkActive="selected-menu text-primary">
						<div class="d-md-none">
							<i class="fal fa-comment fa-lg fa-fw" aria-hidden="true"></i>
						</div>
						<div class="d-none d-md-block">Mes Questions</div>
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" routerLink="/exchange/favorites" routerLinkActive="selected-menu text-primary">
						<div class="d-md-none">
							<i class="fal fa-star fa-lg fa-fw" aria-hidden="true"></i>
						</div>
						<div class="d-none d-md-block">Mes Favoris</div>
					</a>
				</li>
			</ul>
			<a class="btn btn-success" routerLink="/exchange/create">Nouvelle Question</a>
		</nav>
		<router-outlet></router-outlet>
	`,
	styles: [
		'.submenu-fixed-top { margin-top: 61px; z-index: 10 }',
		'.selected-menu { font-weight: 500; }',
		'.navbar-shadow { -webkit-box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12); -moz-box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12); box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12); }'
	],
	animations: [
		trigger('slideIn', [
			transition(':enter', [  // :enter is alias to 'void => *'
				style({ transform: 'translateY(-100%)' }),
				animate("0.5s ease-in-out", style({ transform: 'translateY(0)' }))
			])
		])
	]
})
export class ExchangeComponent { }