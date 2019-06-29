import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
// import { FormControl } from '@angular/forms';

import { ExchangeService } from '../exchange.service';

@Component({
	selector: 'app-exchange-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ExchangeCreateComponent implements OnInit {

	question = {
		title: '',
		content: '',
		tags: []
	};
	// tagsControl: FormControl = new FormControl();
	allTags: string[];
	tag: string;
	newTag: string;
	errorMessage: string;

	markdownText : string;
	
	constructor(
		private router: Router,
		private exchangeService: ExchangeService,
	) { }

	ngOnInit() {
		this.getTags();
	}

	getTags() {
		this.exchangeService.getTags().subscribe(
			response => this.allTags = response,
			error =>  this.errorMessage = <any>error
		);
	}

	trackByFn(index: any, item: any) {
		return index;
	}

	addTag(existingTag?: string) {
		if (existingTag) {
			this.newTag = existingTag;
		}
		if (this.newTag == ' ' || this.question.tags.indexOf(this.newTag) > -1) {
			// Tag empty or already added, reset input
			this.newTag = '';
			// need to close mat-autocomplete
		} else {
			// Tag OK, add it and reset input
			this.question.tags.push(this.newTag.trim());
			this.newTag = '';
			// need to close mat-autocomplete
		}
	}

	removeTag(i) {
		this.question.tags.splice(i, 1);
		this.newTag = null;
		// this.tagsControl.reset();
	};

	createQuestion(question) {
		if (!question) { return; }
		this.exchangeService.createQuestion(question).subscribe(
			question => this.router.navigate(['/exchange', question._id]),
			error => this.errorMessage = <any>error
		);
	}

}
