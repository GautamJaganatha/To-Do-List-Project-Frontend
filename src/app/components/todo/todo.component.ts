import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
onSubmit() {
throw new Error('Method not implemented.');
}

  categories : any[] = [];

  addToTodo! : FormGroup;

  showDropdown = false;

  categoryName : any;

  constructor(
    private fb: FormBuilder,
    private service : UserService,
    private snackbar : MatSnackBar,
    private router : Router,
  ){}

  ngOnInit(){
    this.getCategories();

    this.addToTodo = this.fb.group({
      title : [null,[Validators.required]],
      description : [null,[Validators.required]],
      completed : [false]
    })
  }

  toggleDropdown(category){
    this.categoryName = category;
    if(this.categories.includes(category)){
      
    }
    this.showDropdown = !this.showDropdown;
  }

  getCategories(){
    this.service.getCategory().subscribe(
      res => {
        res.forEach(element => {
          this.categories.push(element);
        });
      }
    )
    console.log(this.categories);
  }

}
