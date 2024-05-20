import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent {

  protected incorrectCredential: boolean = false;
  protected isLoadingButton: boolean = false;
  protected emailIsInvalid: boolean = false;
  protected passwordIsInvalid: boolean = false;
  protected email: string = '';
  protected password: string = '';

  protected emailToSendPassword: string = '';
  protected emailToSendPasswordIsInvalid: boolean = false;
  protected isLoadingButtonSendPassword: boolean = false;
  protected emailSendSuccess: boolean = false;

  constructor(private router: Router,
    private usersSerivce: UsersService,
    private localStorageService: LocalStorageService
  ) { }

  /**click button "confirmar" */
  protected submit(form: any) {
    this.emailIsInvalid = form.controls.email?.invalid || !this.isValidEmail(this.email);
    this.passwordIsInvalid = form.controls.password?.invalid;

    if (this.emailIsInvalid || this.passwordIsInvalid)
      return;

    this.verifyAccount(this.email, this.password);
  }

  private async verifyAccount(email: string, password: string) {
    //verificar si existe la cuenta
    this.isLoadingButton = true;
    const user = await this.usersSerivce.getUser(email, password).toPromise();
    this.isLoadingButton = false;

    if (user == null) {//No existe el usuario
      this.incorrectCredential = true;
      return;
    }

    this.incorrectCredential = false;
    //poner el usuario en el localStorage
    this.localStorageService.setUser(JSON.stringify(user));
    this.router.navigateByUrl('home');
  }


  /**
   * Method to send password by email
   */
  protected async sendPassword(formPop: any) {
    this.emailToSendPasswordIsInvalid = formPop.controls.email?.invalid || !this.isValidEmail(this.emailToSendPassword);

    if (this.emailToSendPasswordIsInvalid)
      return;

    this.isLoadingButtonSendPassword = true;
    await this.usersSerivce.sendPassword(this.emailToSendPassword).toPromise();
    this.isLoadingButtonSendPassword = false;
    this.emailSendSuccess = true;
  }

  /**
   * Method to redirecto to component sign-up
   */
  protected createAccount() {
    this.router.navigateByUrl('sign-up');
  }

  protected dismissAlert(alertName: string) {
    if (alertName == 'loginAlert') {
      this.incorrectCredential = false;
    } else {
      this.emailSendSuccess = false;
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}