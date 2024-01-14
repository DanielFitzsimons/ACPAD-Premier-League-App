import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  state = AuthenticatorCompState.LOGIN;

  credentials = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb:FormBuilder,
    private loadingController: LoadingController, // <-- Inject the LoadingController to handle loading state by displaying a spinner
    private alertController: AlertController, // <-- Inject the AlertController to handle errors and display alert messages
    private auth: AuthenticationService, // <-- Inject the AuthService to handle login and registration
    private router: Router, // <-- Inject the Router to redirect after successful login
  ) {}

  ngOnInit(
    
  ) {}

  get email(){
    return this.credentials.controls.email;
  }

  get password(){
    return this.credentials.controls.password;
  }


  async login() {
    const loading = await this.loadingController.create({
      message: 'Logging in...',
    });
    await loading.present();

    try {
      const user = await this.auth.login(this.credentials.getRawValue());
      if (user) {
        this.router.navigateByUrl('/home', { replaceUrl: true });
      } else {
        this.showAlert('Login failed', 'Invalid credentials.');
      }
    } catch (error: unknown) {
      let message = 'An error occurred during login.';
      if (error instanceof Error) {
        // Now we know that error is an instance of Error, we can access its message property.
        message = error.message;
      }
      this.showAlert('Login failed', message);
    } finally {
      await loading.dismiss();
    }
  }

  async register() {
    const loading = await this.loadingController.create({
      message: 'Registering...',
    });
    await loading.present();

    try {
      const user = await this.auth.register(this.credentials.getRawValue());
      if (user) {
        this.router.navigateByUrl('/home', { replaceUrl: true });
      } else {
        this.showAlert('Registration failed', 'Could not create account.');
      }
    } catch (error: unknown) {
      let message = 'An error occurred during registration.';
      if (error instanceof Error) {
        // Now we know that error is an instance of Error, we can access its message property.
        message = error.message;
      }
      this.showAlert('Registration failed', message);
    } finally {
      await loading.dismiss();
    }
  }

  async sendReset(){
    const loading = await this.loadingController.create();
    await loading.present();
    // Call the resetPw method from the AuthService. This returns a promise.
    await this.auth.resetPw(this.email.value);
    // Dismiss the loading spinner
    await loading.dismiss();
    // Show an alert message
    this.showAlert(
      'Password reset',
      'Check your inbox for the password reset link'
    );
  }

  loginState() {
    this.state = AuthenticatorCompState.LOGIN;  
  }

  registerState() {
    this.state = AuthenticatorCompState.REGISTER;  
  }

  resetPassState() {
    this.state = AuthenticatorCompState.FORGOT_PASSWORD;  
  }

  isLoginState() {
    return this.state === AuthenticatorCompState.LOGIN;
  }

  isRegisterState() {
    return this.state === AuthenticatorCompState.REGISTER;
  }

  isResetState() {
    return this.state === AuthenticatorCompState.FORGOT_PASSWORD;
  }

  getStateText() {
    switch (this.state) {
      case AuthenticatorCompState.LOGIN:
        return 'Login';
      case AuthenticatorCompState.REGISTER:
        return 'Register';
      case AuthenticatorCompState.FORGOT_PASSWORD:
        return 'Forgot Password';
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: 'top-alert',
      header,
      message,
      buttons: ['OK'],
    });
     // Add CSS rule for 'top-alert' class
      const style = document.createElement('style');
      style.textContent = `
        .top-alert {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 9999;
        }
      `;
      document.head.appendChild(style);

    await alert.present();
  }

}

export enum AuthenticatorCompState {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD,
}