import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ExchangeService } from '../exchange.service';
import { AuthService } from '../../auth/auth.service';

import { Question } from '../../models/question.model';
import { User } from '../../models/user.model';

import { find , filter } from 'lodash';

interface Filter {
	tag: string,
	amount: number
}

@Component({
	selector: 'app-exchange-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class ExchangeIndexComponent implements OnInit {

	questions: Question[] = [];

	filteredQuestions: Question[] = [];
	categories: Filter[] = [];	// tag amount
	years: Filter[] = [];	// tag amount
	selectedTags : string[] = [];

	displayOrder: number = 0;	// 0: Cards // 1: List
	
	currentUser: User;
	errorMessage: string;

	constructor(
		private router: Router,
		private exchangeService: ExchangeService,
		private authService: AuthService
	) {
		this.authService.getCurrentUser().subscribe(user => {
			this.currentUser = user;
		})
	}

	ngOnInit() {
		this.getQuestions();
		// this.getTags();
	}

	/********************/
	/* OnInit Functions */
	/********************/

	getQuestions() {
		this.exchangeService.getQuestions().subscribe(response => {
			this.questions = response;
			this.filteredQuestions = response;
			this.getCategories();
		},
		error => this.errorMessage = <any>error);
	}

	// getTags() {
	//   this.exchangeService.getTags().subscribe(
	//     response => this.allTags = response,
	//     error =>  this.errorMessage = <any>error);
	// }

	getCategories() {
		for (let i = 0; i < this.questions.length; i++) {
			for (let j = 0; j < this.questions[i].tags.length; j++) {
				let item = find(this.categories, {tag: this.questions[i].tags[j]});
				let index = this.categories.indexOf(item);
				if (index == -1) {
					this.categories.push({tag: this.questions[i].tags[j], amount: 1});
				} else {
					this.categories[index].amount = this.categories[index].amount + 1;
				}
			}
		}
	}
	
	/*************/
	/* Filtering */
	/*************/
	
	filterQuestions(tag) {
		let index = this.selectedTags.indexOf(tag);
		if (index > -1) {
			this.selectedTags.splice(index, 1);
		} else {
			this.selectedTags.push(tag);
		}
		this.filteredQuestions = filter(this.questions, {'tags': this.selectedTags})
	}

	resetFilters() {
		this.selectedTags = [];
		this.filteredQuestions = this.questions;
	}
	
	/***********/
	/* Display */
	/***********/

	changeDisplay(i: number) {
		this.displayOrder = i;
	}

	/*************/
	/* Utilities */
	/*************/
	
	isStar(question): boolean {
		return question.stars.indexOf(this.currentUser._id) !== -1;
	}

}
