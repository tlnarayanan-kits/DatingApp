import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_mdels/user';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
constructor(private http: HttpClient ) {}
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users/');
  }
  getUser(id: any): Observable<User> {
    console.log('id at 1 ' + id);
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  updateuser(id: number, user: User) {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }
  // tslint:disable-next-line: typedef
  setMainPhoto(userId: number, id: number) {
    return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
  }
  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);

  }

}
