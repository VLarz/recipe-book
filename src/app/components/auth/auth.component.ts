
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AuthResponseData } from './models/auth-response.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm): void {
    this.error = null;
    if (!form.valid) {
      return;
    }
    const EMAIL = form.value.email;
    const PASSWORD = form.value.password;

    this.isLoading = true;

    let authObservable: Observable<AuthResponseData>;
    if (this.isLoginMode) {
      authObservable = this.authService.login(EMAIL, PASSWORD);
    } else {
      authObservable = this.authService.signUp(EMAIL, PASSWORD);
    }

    authObservable.subscribe(
      responseData => {
        this.isLoading = false;
        console.log(responseData);
        if (this.isLoginMode) {
          this.router.navigate(['/recipes']);
        }
      },
      errorMessage => {
        this.isLoading = false;
        this.error = errorMessage;
      }
    );

    form.reset();
  }

  onClose(): void {
    this.error = null;
  }
}
