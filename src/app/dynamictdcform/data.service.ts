import { BadInput } from './../common/bad-input';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class DataService {
  constructor(private url: string, private http: Http) { }

  getResource(endPoint: string) {
    const fullUrl: string = this.url + endPoint;
    return this.http.get(fullUrl)
    .pipe(map(response => response.json()),
        catchError(this.handleError)
    );
  }

  postResource(endPoint: string, resource) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    const fullUrl: string = this.url + endPoint;
    console.log(fullUrl);
    return this.http.post(fullUrl, JSON.stringify(resource), options)
    .pipe(map(response => response.json()),
    catchError(this.handleError)
    );
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      return Observable.throw(new BadInput(error.json()));
    }

    if (error.status === 404) {
      return Observable.throw(new NotFoundError());
    }

    return Observable.throw(new AppError(error));
  }
}
