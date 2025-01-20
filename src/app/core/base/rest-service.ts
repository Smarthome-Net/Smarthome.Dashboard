
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IEnvironment } from '@env';

export abstract class RestService {
  protected path: string;

  constructor(env: IEnvironment, pathModify = '') {
    this.path = env.restApi;
    if (pathModify.length > 0) {
      this.path += `/${pathModify}`;
    }
  }

  protected handleError<T>(operation = 'operation', result?: T): (error: HttpResponse<T>) => Observable<T> {
    return (error: HttpResponse<T>): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  protected dateParser(date: string | Date | number): Date {
    return new Date(date);
  }
}
