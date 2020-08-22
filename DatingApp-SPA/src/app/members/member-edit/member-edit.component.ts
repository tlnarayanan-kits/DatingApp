import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_mdels/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm', {static: true}) editForm: NgForm;
  user: User;
  photoUrl: string;

  @HostListener('window:beforeunload', ['$event'])
  // tslint:disable-next-line: typedef
  unloadNotification($event: any){
    if (this.editForm.dirty){
      $event.returnValue = true;
    }
  }
  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
              private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl );
  }
  updateUser() {
    this.userService.updateuser(this.authService.decodedTokan.nameid[0], this.user).subscribe(next => {
      this.alertify.success('User profile updated');
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    })
  }
  updateMainPhoto(photoUrl){
    this.user.photoUrl = photoUrl;
  }

}
