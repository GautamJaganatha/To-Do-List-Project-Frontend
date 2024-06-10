import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Services/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  loginForm! : FormGroup;

  hidePassword = true;

  constructor(private fb: FormBuilder,
    private snackbar : MatSnackBar,
    private router : Router,
    private authService: AuthenticationService
    ){}

    ngOnInit(){
      this.loginForm = this.fb.group({
        username : [null,[Validators.required]],
        password : [null,[Validators.required]]
      })
    }


    toggleVisibilityPassword(){
      this.hidePassword = !this.hidePassword;
    }

    onSubmit():void{
      const username = this.loginForm.get('username').value;
      const password = this.loginForm.get('password').value;

       this.authService.login(username,password).subscribe((res)=>{
        this.snackbar.open('Login Successfull, Thank You', 'Close',{duration: 5000,panelClass:'error-snackbar'})
        this.router.navigateByUrl('/category')
      },
      (error)=>{
        this.snackbar.open('Bad Credentials, Try Again','Close',{duration:5000})
      }
      );
    }

}
