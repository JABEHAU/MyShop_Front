import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public Email: any;
  constructor() { }

  ngOnInit(): void {
  }

  public test(e: any){
    console.log(e)
    console.log("Hello World!");
    console.log(this.Email);
  }

  onSubmit(f: NgForm) {
    console.log(f.value); // { first: '', last: '' }
    console.log(f.valid); // false
  }

}
