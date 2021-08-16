import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
    credentialForm: FormGroup;
    registerForm: FormGroup;
    login: boolean = true;

    constructor(
        private fb: FormBuilder,
        private _authService: AuthService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.credentialForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });

        this.registerForm = this.fb.group({
            name: ['', [Validators.required]],
            surname: ['', [Validators.required]],
            username: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        })
    }

    goRegister() {
        if (this.login) {
            this.login = false;
        } else {
            this.login = true;
        }
    }

    signIn() {
        this._authService.signIn(this.credentialForm.value)
            .then((res) => {
                this.router.navigateByUrl('/notes');
            }, async err => {
                console.log(err);
            })
    }

    signUp() {
        this._authService.signUp(this.registerForm.value)
            .then(user => {
                this.router.navigateByUrl('/notes');
                this.registerForm.reset();
                this.login = true;
            }, async err => {
                console.log(err);
            })
    }
}