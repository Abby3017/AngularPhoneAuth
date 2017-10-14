import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { PhoneLoginComponent } from './phone-login/phone-login.component';
import * as firebase from "firebase";
import { UserFormComponent } from './user-form/user-form.component';

firebase.initializeApp(environment.firebase);
// reason for this https://github.com/angular/angularfire2/issues/556
const appRoutes: Routes = [
  { path: 'form-fill', component: UserFormComponent },
  // { path: 'hero/:id',      component: HeroDetailComponent },
  {
    path: 'login',
    component: PhoneLoginComponent,
  },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PhoneLoginComponent,
    UserFormComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,//{ enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
