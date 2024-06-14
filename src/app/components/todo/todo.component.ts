import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';
import { Conditional } from '@angular/compiler';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {


  categories : any[] = [];

  addToTodo! : FormGroup;

  showDropdown = false;

  cName : any;
  cId: any;

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
      completed : [false],
    })
  }

  toggleDropdown(cName: any, cId:any){
    
    this.showDropdown = !this.showDropdown == cName ? null : cName ;
    console.log(cName);
    console.log(cId);
    this.cName = cName;
    this.cId = cId;
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


  onSubmit() {
    const formData: FormData = new FormData();
    const todoDto = {
      title: this.addToTodo.get('title').value,
      description: this.addToTodo.get('description').value,
      completed: this.addToTodo.get('completed').value,
      categoryId: this.cId,
      categoryName: this.cName
    };

    this.service.addTodo(todoDto).subscribe(
      (res) =>{
        this.snackbar.open('addtoTodo is Successfull hey', 'Close',{
          duration: 5000
        })
      },
      (error) =>{
        console.log(error);
        this.snackbar.open('Something went wrong', 'Close',{
          duration: 5000
        })
      }
    );
   }

}
