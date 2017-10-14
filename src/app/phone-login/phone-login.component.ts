import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth-service.service';
import {Router} from '@angular/router';
import * as firebase from 'firebase';

declare var grecaptcha:any;

@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.component.html',
  styleUrls: ['./phone-login.component.css'],
  providers: [AuthService]
})
export class PhoneLoginComponent implements OnInit {
  windowRef: any;
  phoneNumber = new PhoneNumber()
  verificationCode: string;
  user: any;
  constructor(private win: AuthService, private router: Router) { }

  ngOnInit() {
    this.windowRef = this.win.windowRef
    this.windowRef.recapthaVerifier = new firebase.auth.RecaptchaVerifier('recaptchaContainer')
    this.windowRef.recapthaVerifier.render()
  }

  sendLoginCode() {
    const appVerifier = this.windowRef.recapthaVerifier;
    const num = this.phoneNumber.e164;
    firebase.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {
        this.windowRef.confirmationResult = result;
      })
      .catch(error => {console.log(error);
        appVerifier.render().then(function(recaptchaContainer) {
          grecaptcha.reset(recaptchaContainer);  //https://stackoverflow.com/questions/41165940/google-recaptcha-reset-in-typescript
        })
      });
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then(result => {
        this.user = result.user;
        this.router.navigate(['/form-fill']);
      })
      .catch(error => console.log(error, "Incorrect code entered?"));
  }

  moveForm() {
    this.router.navigate(['/form-fill']);
    // this.router.navigateByUrl('/form-fill');
  }

}

export class PhoneNumber {
  country: string;
  area: string;
  prefix: string;
  line: string;

  get e164() {
    const num = this.country + this.area + this.prefix + this.line;
    return num;
  }
}



// import service in module
// get form module
// No firebase.app.App instance is currently initialized.