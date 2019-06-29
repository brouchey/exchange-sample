import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth-guard.service';

import { ExchangeComponent } from './exchange.component';
import { ExchangeIndexComponent } from './index/index.component';
import { ExchangeMeComponent } from './me/me.component';
import { ExchangeCreateComponent } from './create/create.component';
import { ExchangeShowComponent } from './show/show.component';
import { ExchangeFavoritesComponent } from './favorites/favorites.component';
import { ExchangeTagsComponent } from './tags/tags.component';

const exchangeRoutes: Routes = [
  {
    path: 'exchange',
    component: ExchangeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ExchangeIndexComponent },
      { path: 'me', component: ExchangeMeComponent },
      { path: 'create', component: ExchangeCreateComponent },
      { path: 'favorites', component: ExchangeFavoritesComponent },
      { path: 't/:tag', component: ExchangeTagsComponent },
      { path: ':id', component: ExchangeShowComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(exchangeRoutes) ],
  exports: [ RouterModule ],
  providers: [ AuthGuard ]
})
export class ExchangeRoutingModule { }