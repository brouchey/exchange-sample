import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ExchangeRoutingModule } from './exchange-routing.module';
import { CardsModule } from '../cards/cards.module';
import { SharedModule } from '../shared/shared.module';

import { ExchangeService } from './exchange.service';

import { ExchangeComponent } from './exchange.component';
import { ExchangeIndexComponent } from './index/index.component';
import { ExchangeMeComponent } from './me/me.component';
import { ExchangeCreateComponent } from './create/create.component';
import { ExchangeShowComponent } from './show/show.component';
import { ExchangeFavoritesComponent } from './favorites/favorites.component';
import { ExchangeTagsComponent } from './tags/tags.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatTooltipModule,
    ExchangeRoutingModule,
    CardsModule,
    SharedModule
  ],
  declarations: [
    ExchangeComponent,
    ExchangeIndexComponent,
    ExchangeMeComponent,
    ExchangeCreateComponent,
    ExchangeShowComponent,
    ExchangeFavoritesComponent,
    ExchangeTagsComponent
  ],
  providers: [ ExchangeService ]
})
export class ExchangeModule { }