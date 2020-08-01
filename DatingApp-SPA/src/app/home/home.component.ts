import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registereMode = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    
  }

  registerToggle(){
    this.registereMode = true;
  }


  cancelRegisterMode(registerMode: boolean){
    this.registereMode = registerMode;
  }
}
