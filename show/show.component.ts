import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ExchangeService } from '../exchange.service';
import { AuthService } from '../../auth/auth.service';
import { DialogService }  from '../../guards/dialog.service';

import { Question } from '../../models/question.model';

@Component({
	selector: 'app-exchange-show',
	templateUrl: './show.component.html',
	styleUrls: ['./show.component.scss']
})

export class ExchangeShowComponent implements OnInit {

	isLoggedIn: boolean;
	currentUser;

	questionId: string;
	question: Question;

	newComment: object = {};
	newAnswer: object = {};
	tagsList: string[];

	editQuestionBoolean: boolean = false;	// only one question
	editAnswersBoolean = {}; // need Id as you could have several answer
	editCommentsBoolean = {}; // need Id as you could have several comments
	saveCopyContent = {};	// content backup in case of edit cancelation

	errorMessage: string;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private exchangeService: ExchangeService,
		private authService: AuthService,
		private dialogService: DialogService
	) {
		this.authService.getCurrentUser().subscribe(user => {
			this.currentUser = user;
		})
		this.authService.isLoggedIn().subscribe(is => {
			this.isLoggedIn = is;
		});
	}

	ngOnInit() {
		this.route.params.subscribe(params => {
			this.questionId = params['id'],
			this.getQuestion();
		});
	}

	/**********/
	/* OnInit */
	/**********/

	getQuestion() {
		this.exchangeService.getQuestion(this.questionId).subscribe(question => {
			this.question = question;
			console.log('QUESTION', question);
			this.setCopyContent(question);
			this.addViewQuestion();
		},
		error =>  this.errorMessage = <any>error);
	}

	setCopyContent(question: Question) {
		// copy question/answers/comments content in case of edit cancelation
		// no trim on question and answers because of formatting (marked)
		this.saveCopyContent[`${question._id}`] = question.content;
		for (let comment of question.comments) {
			this.editCommentsBoolean[`${comment._id}`] = false;
			this.saveCopyContent[`${comment._id}`] = comment.content.trim();
		}
		for (let answer of question.answers) {
			this.editAnswersBoolean[`${answer._id}`] = false;
			this.saveCopyContent[`${answer._id}`] = answer.content;
			for (let comment of answer.comments) {
				this.editCommentsBoolean[`${comment._id}`] = false;
				this.saveCopyContent[`${comment._id}`] = comment.content.trim();
			}
		}
	}

	addViewQuestion() {
		if (this.isLoggedIn && !this.isOwner(this.question)) {
			this.exchangeService.addViewQuestion(this.questionId).subscribe(
				question => this.question = question,
				error =>  this.errorMessage = <any>error);
		}
	}

	/***********************/
	/* Question Management */
	/***********************/

	editQuestion() {
		this.editQuestionBoolean = !this.editQuestionBoolean;
	}

	updateQuestion() {
		if (this.saveCopyContent[this.questionId] != this.question.content) {
			let now = new Date();
			this.question.updatedAt = now;
			this.exchangeService.updateQuestion(this.questionId, this.question).subscribe(
				question => this.question = question,
				error =>  this.errorMessage = <any>error);
			this.saveCopyContent[this.questionId] = this.question.content;
		}
		this.editQuestion();
	}

	discardQuestionChange() {
		this.question.content = this.saveCopyContent[this.questionId];
		this.editQuestion();
	}

	deleteQuestion() {
		this.exchangeService.deleteQuestion(this.questionId).subscribe(
			() => this.router.navigate(['/exchange']),
			error => this.errorMessage = <any>error);
	}

	// getTags() {
	//   this.exchangeService.getTags().subscribe(
	//     response => this.tagsList = response,
	//     error =>  this.errorMessage = <any>error);
	// }

	/*********************/
	/* Answer Management */
	/*********************/

	createAnswer(newAnswer) {
		if (!newAnswer.content) { return; }
		this.exchangeService.createAnswer(this.questionId, newAnswer).subscribe(
			response => {
				this.question = response;
				this.newAnswer = {};
			},
			error =>  this.errorMessage = <any>error);
	}

	editAnswer(answerId) {
		this.editAnswersBoolean[answerId] = !this.editAnswersBoolean[answerId];
	}

	updateAnswer(answer) {
		if (this.saveCopyContent[answer._id] != answer.content) {
			this.exchangeService.updateAnswer(this.questionId, answer._id, answer).subscribe(
				response =>	this.question = response,
				error =>  this.errorMessage = <any>error);
			this.saveCopyContent[answer._id] = answer.content;
		}
		this.editAnswer(answer._id);
	}

	discardAnswerChange(answer) {
		answer.content = this.saveCopyContent[answer._id];
		this.editAnswer(answer._id);
	}

	deleteAnswer(answerId) {
		this.exchangeService.deleteAnswer(this.questionId, answerId).subscribe(
			response => this.question = response,
			error =>  this.errorMessage = <any>error);
	}

	/***********************/
	/* Comments Management */
	/***********************/

	createComment(newComment) {
		if (!newComment.content) { return; }
		this.exchangeService.createComment(this.questionId, newComment).subscribe(
			response => this.question = response,
			error =>  this.errorMessage = <any>error);
	}

	editComment(commentId) {
		this.editCommentsBoolean[commentId] = !this.editCommentsBoolean[commentId];
	}

	updateComment(comment) {
		if (this.saveCopyContent[comment._id] != comment.content.trim()) {
			this.exchangeService.updateComment(this.questionId, comment._id, comment).subscribe(
				response =>	this.question = response,
				error =>  this.errorMessage = <any>error);
			this.saveCopyContent[comment._id] = comment.content.trim();
		}
		this.editComment(comment._id);
	}

	discardCommentChange(comment) {
		comment.content = this.saveCopyContent[comment._id];
		this.editComment(comment._id);
	}

	deleteComment(commentId) {
		this.exchangeService.deleteComment(this.questionId, commentId).subscribe(
			response => this.question = response,
			error =>  this.errorMessage = <any>error);
	}

	createAnswerComment(answerId, newComment) {
		if (!newComment) { return; }
		this.exchangeService.createAnswerComment(this.questionId, answerId, newComment).subscribe(
			response => this.question = response,
			error =>  this.errorMessage = <any>error);
	}

	updateAnswerComment(answerId, comment) {
		if (this.saveCopyContent[comment._id] != comment.content.trim()) {
			let now = new Date();
			comment.updatedAt = now;
			this.exchangeService.updateAnswerComment(this.questionId, answerId, comment._id, comment).subscribe(
				response => this.question = response,
				error =>  this.errorMessage = <any>error);
			this.saveCopyContent[comment._id] = comment.content;
			
		}
		this.editComment(comment._id);
	}

	deleteAnswerComment(answerId, commentId) {
		this.exchangeService.deleteAnswerComment(this.questionId, answerId, commentId).subscribe(
			response => this.question = response,
			error =>  this.errorMessage = <any>error);
	}

	/*************/
	/* Utilities */
	/*************/

	trackByIndex(index: number, value: number) {
		return index;
	}

	isOwner(obj): boolean {
		return this.isLoggedIn && obj && obj.user && obj.user._id === this.currentUser._id;
	}

	isStar(question): boolean {
		return this.isLoggedIn && question && question.stars && question.stars.indexOf(this.currentUser._id) !== -1;
	}

	/*************/
	/* Favorites */
	/*************/

	starQuestion() {
		this.exchangeService.starQuestion(this.questionId).subscribe(
			response => this.question = response,
			error =>  this.errorMessage = <any>error);
	}

	unstarQuestion() {
		this.exchangeService.unstarQuestion(this.questionId).subscribe(
			response => this.question = response,
			error =>  this.errorMessage = <any>error);
	}

	/***************/
	/* Best Answer */
	/***************/

	bestAnswer(answerId: string) {
		this.exchangeService.bestAnswer(this.questionId, answerId).subscribe(
			response => this.question = response,
			error =>  this.errorMessage = <any>error);
	}

	/********************/
	/* Votes Management */
	/********************/

	isUpvoted(obj): boolean {
		return this.isLoggedIn && obj && obj.upvotes && obj.upvotes.indexOf(this.currentUser._id) !== -1;
	}

	isDownvoted(obj): boolean {
		return this.isLoggedIn && obj && obj.downvotes && obj.downvotes.indexOf(this.currentUser._id) !== -1;
	}

	upvote(answerId?: string) {
		this.exchangeService.upvote(this.questionId, answerId).subscribe(
			response => this.question = response,
			error =>  this.errorMessage = <any>error);
	}

	cancelUpvote(answerId?: string) {
		this.exchangeService.cancelUpvote(this.questionId, answerId).subscribe(
			response => this.question = response,
			error =>  this.errorMessage = <any>error);
	}

	downvote(answerId?: string) {
		this.exchangeService.downvote(this.questionId, answerId).subscribe(
			response => this.question = response,
			error =>  this.errorMessage = <any>error);
	}

	cancelDownvote(answerId?: string) {
		this.exchangeService.cancelDownvote(this.questionId, answerId).subscribe(
			response => this.question = response,
			error =>  this.errorMessage = <any>error);
	}

	/************************/
  /* Dialog Browser Popup */
	/************************/

	deleteQuestionDialog() {
		this.dialogService.confirm('Êtes-vous sûr de vouloir supprimer cette question ? Cette action ne pourra être annulée.').subscribe(
			response => {
				if (response == true) this.deleteQuestion();
			},
			error => this.errorMessage = <any>error);
	}

	deleteAnswerDialog(answerId) {
		this.dialogService.confirm('Êtes-vous sûr de vouloir supprimer cette réponse ? Cette action ne pourra être annulée.').subscribe(
			response => {
				if (response == true) this.deleteAnswer(answerId);
			},
			error => this.errorMessage = <any>error);
	}

	deleteCommentDialog(commentId) {
		this.dialogService.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ? Cette action ne pourra être annulée.').subscribe(
			response => {
				if (response == true) this.deleteComment(commentId);
			},
			error => this.errorMessage = <any>error);
	}

	deleteAnswerCommentDialog(answerId, commentId) {
		this.dialogService.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ? Cette action ne pourra être annulée.').subscribe(
			response => {
				if (response == true) this.deleteAnswerComment(answerId, commentId);
			},
			error => this.errorMessage = <any>error);
	}

}
