import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  protected email: any;
  protected name: any;
  protected phone: any;
  protected country: any;
  protected state: any;
  protected city: any;
  protected password: any;
  protected passwordR: any;
  protected wrongPasswordRepeat: boolean = false;
  protected isLoadingButton: boolean = false;
  protected emailExists: boolean = false;
  protected userRegisterSuccess: boolean = false;

  constructor(private router: Router,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
  }

  protected async submit(form: any) {
    form.control.markAllAsTouched();
    this.wrongPasswordRepeat = false;

    if (this.password != this.passwordR)
      this.wrongPasswordRepeat = true;

    if (!form.valid || this.wrongPasswordRepeat)
      return;

    this.isLoadingButton = true;
    this.emailExists = await this.userService.verifyEmailExists(this.email);

    if (this.emailExists) {
      this.isLoadingButton = false;
      return;
    }

    this.userRegisterSuccess = await this.userService.insertNewUser(this.createUserRequest());
    this.isLoadingButton = false;
  }

  protected login() {
    this.router.navigateByUrl('login');
  }

  protected dismissAlert() {
    this.emailExists = false;
  }

  private createUserRequest() {
    return {
      email: this.email,
      userName: this.name,
      phoneNumber: this.phone,
      country: this.country,
      state: this.state,
      city: this.city,
      password: this.password
    };
  }
}