import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  
  categoryForm! : FormGroup;

  

  constructor(
    private fb : FormBuilder,
    private router : Router,
    private snackbar : MatSnackBar,
    private service : UserService
  ){

  }

  ngOnInit(){
    this.categoryForm = this.fb.group({
      name : [null, [Validators.required]],
    })
  }

  onSubmit(){
    this.service.addCategory(this.categoryForm.value).subscribe(
      (res)=>{
        this.snackbar.open('Category Successfully Added On to next', 'Close', {
          duration: 5000
        })
      },
      (error) =>{
        this.snackbar.open('Error','Close',{
          duration:5000, panelClass:'error-snackbar'
        })
      }
    )
  }
}
