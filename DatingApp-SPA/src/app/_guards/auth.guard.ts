import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
              private alertify: AlertifyService) {}

  canActivate(): boolean  {
    if (this.authService.loggedIn()) {
      return true;
    }
    this.alertify.error('You shall not pass!!');
    this.router.navigate(['/home']);
    return false;
  }
}
