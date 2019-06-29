import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Question } from '../models/question.model';

// https://angular.io/guide/http

@Injectable()
export class ExchangeService {

	private exchangeUrl = 'api/questions';

	constructor(
		private http: HttpClient
	) { }

	getQuestions(): Observable<Question[]> {
		return this.http.get<Question[]>(this.exchangeUrl).pipe(
			tap(questions => console.log(`fetched questions`)),
			catchError(this.handleError(`getQuestions`, []))
		);
	}

	getMyQuestions(): Observable<Question[]> {
		const url = `${this.exchangeUrl}/me`;
		return this.http.get<Question[]>(url).pipe(
			tap(questions => console.log(`fetched my questions`)),
			catchError(this.handleError(`getMyQuestions`, []))
		);
	}

	getQuestion(id: string): Observable<Question> {
		const url = `${this.exchangeUrl}/${id}`;
		return this.http.get<Question>(url).pipe(
			tap(_ => console.log(`fetched question id=${id}`)),
			catchError(this.handleError<Question>(`getQuestion id=${id}`))
		);
	}

	getUserQuestions(userId: string): Observable<Question[]> {
		const url = `${this.exchangeUrl}/user/${userId}`;
		return this.http.get<Question[]>(url).pipe(
			tap(questions => console.log(`fetched questions of user=${userId}`)),
			catchError(this.handleError(`getUserQuestions user=${userId}`, []))
		);
	}

	getFriendsQuestions(friendsId): Observable<Question[]> {
		const url = `${this.exchangeUrl}/friends`;
		return this.http.post<Question[]>(url, {friends: friendsId}).pipe(
			tap(modules => console.log(`fetched friends questions`)),
			catchError(this.handleError(`getFriendsQuestions`, []))
		);
	}

	getMyStarQuestions(): Observable<Question[]> {
		const url = `${this.exchangeUrl}/stars`;
		return this.http.get<Question[]>(url).pipe(
			tap(questions => console.log(`fetched star questions`)),
			catchError(this.handleError(`getMyStarQuestions`, []))
		);
	}

	getQuestionsByTag(tag: string): Observable<Question[]> {
		const url = `${this.exchangeUrl}/tag/${tag}`;
		return this.http.get<Question[]>(url).pipe(
			tap(questions => console.log(`fetched questions by tag=${tag}`)),
			catchError(this.handleError(`getQuestionsByTag`, []))
		);
	}

	getCourseQuestions(courseId: string): Observable<Question[]> {
		const url = `${this.exchangeUrl}/course/${courseId}`;
		return this.http.get<Question[]>(url).pipe(
			tap(questions => console.log(`fetched questions of course=${courseId}`)),
			catchError(this.handleError(`getCourseQuestions`, []))
		);
	}

	getNoteQuestions(noteId: string): Observable<Question[]> {
		const url = `${this.exchangeUrl}/note/${noteId}`;
		return this.http.get<Question[]>(url).pipe(
			tap(questions => console.log(`fetched questions of note=${noteId}`)),
			catchError(this.handleError(`getNoteQuestions`, []))
		);
	}

	searchQuestions(keyword: string) {
		const url = `${this.exchangeUrl}/search/${keyword}`;
		return this.http.get<Question[]>(url).pipe(
			tap(questions => console.log(`fetched questions keyword=${keyword}`)),
			catchError(this.handleError<Question[]>(`searchQuestions`))
		);
	}

	createQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.exchangeUrl, question).pipe(
      tap((question: Question) => console.log(`added question`)),
      catchError(this.handleError<Question>(`createQuestion`))
    );
  }

	updateQuestion(questionId: string, editedQuestion: object): Observable<any> {
		const url = `${this.exchangeUrl}/${questionId}`;
		return this.http.put(url, editedQuestion).pipe(
			tap(_ => console.log(`updated question id=${questionId}`)),
			catchError(this.handleError<any>(`updateQuestion`))
		);
	}

	deleteQuestion(questionId: string): Observable<Question> {
		const url = `${this.exchangeUrl}/${questionId}`;
		return this.http.delete<Question>(url).pipe(
			tap(_ => console.log(`deleted question id=${questionId}`)),
			catchError(this.handleError<Question>(`deleteQuestion`))
		);
	}

	createComment(questionId: string, newComment: object): Observable<any> {
		const url = `${this.exchangeUrl}/${questionId}/comment`;
		return this.http.put(url, newComment).pipe(
			tap(_ => console.log(`created comment for question id=${questionId}`)),
			catchError(this.handleError<any>(`createComment`))
		);
	}

	updateComment(questionId: string, commentId: string, comment: object): Observable<any> {
		const url = `${this.exchangeUrl}/${questionId}/comment/${commentId}`;
		return this.http.put(url, comment).pipe(
			tap(_ => console.log(`updated comment ${commentId} for question id=${questionId}`)),
			catchError(this.handleError<any>(`updateComment`))
		);
	}

	deleteComment(questionId: string, commentId: string): Observable<Question> {
		const url = `${this.exchangeUrl}/${questionId}/comment/${commentId}`;
		return this.http.delete<Question>(url).pipe(
			tap(_ => console.log(`deleted comment ${commentId} for question id=${questionId}`)),
			catchError(this.handleError<Question>(`deleteComment`))
		);
	}

	createAnswer(questionId: string, newAnswer: object): Observable<any> {
		const url = `${this.exchangeUrl}/${questionId}/answer`;
		return this.http.put(url, newAnswer).pipe(
			tap(_ => console.log(`created answer for question id=${questionId}`)),
			catchError(this.handleError<any>(`createAnswer`))
		);
	}

	updateAnswer(questionId: string, answerId: string, editedAnswer: object): Observable<any> {
		const url = `${this.exchangeUrl}/${questionId}/answer/${answerId}`;
		return this.http.put(url, editedAnswer).pipe(
			tap(_ => console.log(`updated answer ${answerId} for question id=${questionId}`)),
			catchError(this.handleError<any>(`updateAnswer`))
		);
	}

	deleteAnswer(questionId: string, answerId: string): Observable<Question> {
		const url = `${this.exchangeUrl}/${questionId}/answer/${answerId}`;
		return this.http.delete<Question>(url).pipe(
			tap(_ => console.log(`deleted answer for question id=${questionId}`)),
			catchError(this.handleError<Question>(`deleteAnswer`))
		);
	}

	createAnswerComment(questionId: string, answerId: string, newComment: string): Observable<any> {
		const url = `${this.exchangeUrl}/${questionId}/answer/${answerId}/comment`;
		return this.http.put(url, {content: newComment}).pipe(
			tap(_ => console.log(`created comment for answer ${answerId} of question ${questionId}`)),
			catchError(this.handleError<any>(`createAnswerComment`))
		);
	}

	updateAnswerComment(questionId: string, answerId: string, commentId: string, editedComment: object): Observable<any> {
		const url = `${this.exchangeUrl}/${questionId}/answer/${answerId}/comment/${commentId}`;
		return this.http.put(url, editedComment).pipe(
			tap(_ => console.log(`updated comment ${commentId} for answer ${answerId} of question ${questionId}`)),
			catchError(this.handleError<any>(`updateAnswerComment`))
		);
	}

	deleteAnswerComment(questionId: string, answerId: string, commentId: string): Observable<Question> {
		const url = `${this.exchangeUrl}/${questionId}/answer/${answerId}/comment/${commentId}`;
		return this.http.delete<Question>(url).pipe(
			tap(_ => console.log(`deleted comment ${commentId} for answer ${answerId} of question ${questionId}`)),
			catchError(this.handleError<Question>(`deleteAnswerComment`))
		);
	}

	getTags(): Observable<string[]> {
		const url = `${this.exchangeUrl}/tags`;
		return this.http.get<string[]>(url).pipe(
			tap(_ => console.log(`fetched tags`)),
			catchError(this.handleError(`getTags`, []))
		);
	}

	addViewQuestion(questionId: string): Observable<any> {
		const url = `${this.exchangeUrl}/${questionId}/view`;
		return this.http.put(url, null).pipe(
			tap(_ => console.log(`add view to question ${questionId}`)),
			catchError(this.handleError<any>(`addViewQuestion`))
		);
	}

	starQuestion(questionId: string): Observable<any> {
		const url = `${this.exchangeUrl}/${questionId}/star`;
		return this.http.put(url, null).pipe(
			tap(_ => console.log(`starred question ${questionId}`)),
			catchError(this.handleError<any>(`starQuestion`))
		);
	}

	unstarQuestion(questionId: string): Observable<Question> {
		const url = `${this.exchangeUrl}/${questionId}/star`;
		return this.http.delete<Question>(url).pipe(
			tap(_ => console.log(`unstarred question ${questionId}`)),
			catchError(this.handleError<Question>(`unstarQuestion`))
		);
	}

	bestAnswer(questionId: string, answerId: string): Observable<any> {
		const url = `${this.exchangeUrl}/${questionId}/answer/${answerId}/best`;
		return this.http.put(url, null).pipe(
			tap(_ => console.log(`set best answer ${answerId} for question ${questionId}`)),
			catchError(this.handleError<any>(`bestAnswer on question ${questionId}`))
		);
	}

	upvote(questionId: string, answerId?: string): Observable<any> {
		let url = this.exchangeUrl + `/${questionId}`;
		if (!answerId) {
			url = url + `/upvote`;
		} else {
			url = url + `/answer/${answerId}/upvote`;
		}
		return this.http.put(url, null).pipe(
			tap(_ => console.log(`upvote on question ${questionId}`)),
			catchError(this.handleError<any>(`upvote`))
		);
	}

	cancelUpvote(questionId: string, answerId?: string): Observable<Question> {
		let url = this.exchangeUrl + `/${questionId}`;
		if (!answerId) {
			url = url + `/upvote`;
		} else {
			url = url + `/answer/${answerId}/upvote`;
		}
		return this.http.delete<Question>(url).pipe(
			tap(_ => console.log(`cancel upvote on question ${questionId}`)),
			catchError(this.handleError<Question>(`cancelUpvote`))
		);
	}

	downvote(questionId: string, answerId?: string): Observable<any> {
		let url = this.exchangeUrl + `/${questionId}`;
		if (!answerId) {
			url = url + `/downvote`;
		} else {
			url = url + `/answer/${answerId}/downvote`;
		}
		return this.http.put(url, null).pipe(
			tap(_ => console.log(`downvote on question ${questionId}`)),
			catchError(this.handleError<any>(`downvote`))
		);
	}

	cancelDownvote(questionId: string, answerId?: string): Observable<Question> {
		let url = this.exchangeUrl + `/${questionId}`;
		if (!answerId) {
			url = url + `/downvote`;
		} else {
			url = url + `/answer/${answerId}/downvote`;
		}
		return this.http.delete<Question>(url).pipe(
			tap(_ => console.log(`cancel downvote on question ${questionId}`)),
			catchError(this.handleError<Question>(`cancelDownvote`))
		);
	}

	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error); 
			console.log(`${operation} failed: ${error.message}`);
			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}
   
}