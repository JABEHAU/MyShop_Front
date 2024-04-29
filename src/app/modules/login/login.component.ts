import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, SharedModule, HttpClientModule]
})
export class LoginComponent {

  public incorrectCredential: boolean = false;
  public isLoadingButton: boolean = false;
  public emailIsInvalid: boolean = false;
  public passwordIsInvalid: boolean = false;
  public email: string = '';
  public password: string = '';
  public emailToSendPassword: string = '';
  public emailToSendPasswordIsInvalid: boolean = false;
  public emailSendSuccess: boolean = false;
  constructor(private router: Router,
    private usersSerivce: UsersService
  ) { }

  public submit(form: any){
    this.emailIsInvalid = form.controls.email?.invalid;
    this.passwordIsInvalid = form.controls.password?.invalid;

    if(this.emailIsInvalid || this.passwordIsInvalid)
      return;

    
    this.verifyAccount(this.email, this.password);
  }

  /**
   * Method to login
   * @param email 
   * @param password 
   */
  private async verifyAccount(email: string, password: string){
    //verificar si existe la cuenta
    this.isLoadingButton=true;
    const user = await this.usersSerivce.getUser(email, password).toPromise();
    this.isLoadingButton=false;

    if(user==null){
      this.incorrectCredential = true;
      return;
    }

    this.incorrectCredential = false;
    //poner el usuario en el localStorage
    localStorage.setItem('user', JSON.stringify(user));
    //redirigír al home
    this.router.navigateByUrl('home');
  }


  /**
   * Method to send password by email
   */
  public sendPassword(formPop: any){
    this.emailToSendPasswordIsInvalid = formPop.controls.email?.invalid;
    if(this.emailToSendPasswordIsInvalid)
      return;

    this.emailSendSuccess=true;
  }

  /**
   * Method to redirecto to component sign-up
   */
  public createAccount(){
    this.router.navigateByUrl('sign-up');
  }

  public dismissAlert(numberAlert: number){
    if(numberAlert==1){
      this.incorrectCredential = false;
    }else{
      this.emailSendSuccess = false;
    }
  }
}