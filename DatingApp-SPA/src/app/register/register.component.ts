import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_mdels/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();

  user: User;
  registrationForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;


  constructor(private authService: AuthService, private router: Router,
              private alertify: AlertifyService, private fb: FormBuilder  ) { }

  ngOnInit() {
    // this.registrationForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', [Validators.required,
    //     Validators.minLength(4), Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('', Validators.required)
    // }, this.passwordMatchValidator);
    this.bsConfig = {
      containerClass: 'theme-red',
      dateInputFormat: 'DD-MM-YYYY'
    }
    this.createRegistrationForm();
  }

  // tslint:disable-next-line: typedef
  createRegistrationForm(){
    this.registrationForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required,
        Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }
  passwordMatchValidator(g: FormGroup)
  {
    return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch': true};
  }
  register(){
   if (this.registrationForm.valid){
     this.user = Object.assign({}, this.registrationForm.value);
     this.authService.register(this.user).subscribe(() => {
       this.alertify.success('Registration Successful');
     }, error => {
       this.alertify.error(error);
     }, () => {
       this.authService.login(this.user).subscribe(() => {
         this.router.navigate(['/members']);
       });
     });
   }
   
    /*  this.authService.register(this.model).subscribe(() => {
      this.alertify.success('register successful');
    }, error => {
      this.alertify.error(error);
    }); */
    console.log(this.registrationForm.value);
  }
  cancel(){
    this.cancelRegister.emit(false);
    this.alertify.message('cancelled');
  }

}
