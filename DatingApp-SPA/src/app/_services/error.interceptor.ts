
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError} from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = req.headers
            .set('Content-Type', 'application/json');
        const authReq = req.clone({ headers });
        return next.handle(authReq).pipe(
            catchError( error => {
                if (error.Status == 401) {
                    return throwError(error.statusText);
                }
                if (error instanceof HttpErrorResponse) {
                    const applicationError = error.headers.get('Application-Error');
                    if (applicationError) {
                        throwError(applicationError);
                    }
                    const serverError = error.error;
                    let modalStateErrors = '';
                    if (serverError.errors && typeof serverError.errors === 'object' ) {
                        for (const key in serverError.errors){
                            if (serverError.errors[key]) {
                                modalStateErrors += serverError.errors[key] + '\n';
                            }
                        }

                    }
                    return throwError(modalStateErrors || serverError || 'Server Error');
                }
            })
        );
    }

}
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};

