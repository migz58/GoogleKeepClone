import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginPageComponent } from './login-page/login-page.component';
import { NotesPageComponent } from './notes-page/notes-page.component';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent,
        LoginPageComponent,
        NotesPageComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFirestoreModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
