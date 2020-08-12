import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_mdels/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  constructor(private userService: UserService, private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  user: User;

  ngOnInit() {
    this.loadUser();
  }

  // tslint:disable-next-line: typedef
  loadUser(){
    // tslint:disable-next-line: no-string-literal
    this.userService.getUser(+this.route.snapshot.params['id']).subscribe((user: User) => {
      this.user = user;
    }, error => {
      this.alertify.error(error);
    });
  }
}
