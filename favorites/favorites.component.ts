import { Component, OnInit } from '@angular/core';

import { Question } from '../../models/question.model';
import { ExchangeService } from '../exchange.service';

@Component({
	selector: 'app-exchange-favorites',
	templateUrl: './favorites.component.html',
	styleUrls: ['./favorites.component.scss'],
})

export class ExchangeFavoritesComponent implements OnInit {

	favorites: Question[] = [];
	displayOrder: number = 0;	// 0: Cards // 1: List
	errorMessage: string;

	constructor(
		private exchangeService: ExchangeService
	) { }

	ngOnInit() {
		this.getFavorites();
	}

	/**********/
	/* OnInit */
	/**********/

	getFavorites() {
		this.exchangeService.getMyStarQuestions().subscribe(
			response => this.favorites = response,
			error => this.errorMessage = <any>error
		);
	}

	/************************/
	/* Favorites Management */
	/************************/

	unstarQuestion(question) {
		this.exchangeService.unstarQuestion(question._id).subscribe(
			response => this.getFavorites(),
			error => this.errorMessage = <any>error
		);
	}

	/*************/
	/* Utilities */
	/*************/

	changeDisplay(i: number) {
		this.displayOrder = i;
	}

}
