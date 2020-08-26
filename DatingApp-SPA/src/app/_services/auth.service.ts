import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import {map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { User } from '../_mdels/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedTokan: any;
  currentUser: User;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  changeMemberPhoto(photoUrl: string)
  {
    this.photoUrl.next(photoUrl);
  }
// tslint:disable-next-line: typedef
login(user: User) {
  return this.http.post(this.baseUrl + 'login', user)
  .pipe(map((response: any) => {
    const user = response;
    if (user) {
      localStorage.setItem('token', user.token);
      localStorage.setItem('user', JSON.stringify(user.user));
      this.decodedTokan = this.jwtHelper.decodeToken(user.token);
      this.currentUser = user.user;
      this.changeMemberPhoto(this.currentUser.photoUrl);
      

    }
  })
  );
}

register(model: any){
  return this.http.post(this.baseUrl + 'register', model);
}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}
}
