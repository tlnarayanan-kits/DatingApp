import { Injectable } from '@angular/core';
import { User } from '../_mdels/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, VirtualTimeScheduler, of, fromEventPattern } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
@Injectable()
export class MemberEditResolver implements Resolve<User> {
    constructor(private userService: UserService, private authService: AuthService,
                private router: Router,
        // tslint:disable-next-line: align
        private alertify: AlertifyService) {}
    // tslint:disable-next-line: no-trailing-whitespace
    
    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        // tslint:disable-next-line: no-string-literal
        return this.userService.getUser(this.authService.decodedTokan.nameid[0]).pipe(
            catchError(error => {
                this.alertify.error('Problem in retrieving your data');
                this.router.navigate(['/members']);
                console.log(this.authService.decodedTokan.nameid[0]);
                return of(null);
            })
        );
    }
}

