import { Component } from '@angular/core';
import { AuthenticationService } from './Services/auth/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  

  title = '';

  constructor(
    private authService: AuthenticationService,
    private snackbar: MatSnackBar,

  ){

  }

  getData(){
    this.authService.getData().subscribe(
      (res) =>{
        this.title = res;
      }
    )
  }
}
