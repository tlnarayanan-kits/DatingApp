import { Injectable } from '@angular/core';
import { User } from '../_mdels/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, VirtualTimeScheduler, of, fromEventPattern } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
    pageNumber = 1;
    pageSize = 4;
    constructor(private userService: UserService, private router: Router,
        // tslint:disable-next-line: align
        private alertify: AlertifyService) {}
    // tslint:disable-next-line: no-trailing-whitespace
    
    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        // tslint:disable-next-line: no-string-literal
        return this.userService.getUsers(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem in retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}

