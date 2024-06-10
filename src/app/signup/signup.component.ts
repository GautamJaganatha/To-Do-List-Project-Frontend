import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../Services/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signUpForm!: FormGroup;
  hidePassword = true;
  

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    });
  }

  toggleVisibilityPassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  

  onSubmit(): void {
    if (this.signUpForm.invalid) {
      return;
    }

    const password = this.signUpForm.get('password')?.value;
    const confirmPassword = this.signUpForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.snackbar.open('Password did not match, try again', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
      return;
    }
    console.log(this.signUpForm.value);

    
    this.authService.register(this.signUpForm.value).subscribe(
      (res) => {
        this.snackbar.open('SignUp Successful', 'Close', { duration: 5000, panelClass: 'success-snackbar' });
        this.router.navigateByUrl('/login');
      },
      (error) => {
        this.snackbar.open('SignUp failed', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
      }
    );
  }

}
