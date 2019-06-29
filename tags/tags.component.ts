import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { ExchangeService } from '../exchange.service';

import { Question } from '../../models/question.model';

@Component({
  selector: 'app-exchange-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})

export class ExchangeTagsComponent implements OnInit {

  tag: string;
  questions: Question[] = [];
  currentUser;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private exchangeService: ExchangeService,
    private authService: AuthService
  ) {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tag = params['tag'],
      this.getQuestionsByTag();
    });
  }

  getQuestionsByTag() {
    this.exchangeService.getQuestionsByTag(this.tag)
      .subscribe(
        response => this.questions = response,
        error => this.errorMessage = <any>error);
  }

  isStar(question): boolean {
    return question.stars.indexOf(this.currentUser._id) !== -1;
  }

}
